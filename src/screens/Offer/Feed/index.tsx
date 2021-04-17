import React, { useEffect } from 'react';
import APIAdapter from '../../../services/api';
import { User, OfferResume } from '../../../models';
import OfferCard from '../OfferCard';
import { parseBase64ToPictures } from '../../../utils/images';

const Feed: React.FC = () => {
  const [offers, setOffers] = React.useState<Array<OfferResume>>([]);

  useEffect(() => {
    const getData = async () => {
      const API = new APIAdapter();
      const data = await API.get('/offer');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.forEach(async (item: any) => {
        const trade = item.price === null ? 1 : 3;
        const type: number = item.is_trade ? trade : 2;
        const picturesBase64 = item.pictures;

        // parse only one picture
        const pictures = await parseBase64ToPictures(picturesBase64);

        const user: User = {
          name: item.user.name,
          ratings: item.user.ratings_amount,
          sells: item.sells_amount,
          average: item.average,
        };

        const offer: OfferResume = {
          id: item.id,
          gameName: item.game_name,
          platform: item.platform,
          price: item.price,
          author: user,
          cep: item.cep,
          type,
          pictures,
          condition: item.condition,
          description: item.description,
        };

        setOffers((state) => [...state, offer]);
      });
    };

    getData();
  }, []);

  return (
    <>
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </>
  );
};

export default Feed;
