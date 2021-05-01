import React, { useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import APIAdapter from '../../../services/api';
import { User, OfferResume as Offer } from '../../../models';
import OfferCard from '../OfferCard';

import { CardContainer, SkeletonCard, SkeletonRect } from './styles';

import { parseBase64ToPictures } from '../../../utils/images';
import { dataToOfferResume } from '../../../utils/data';

interface OfferResume extends Offer {
  loading: boolean;
}

const Feed: React.FC = () => {
  const [offers, setOffers] = React.useState<Array<OfferResume>>([]);

  useEffect(() => {
    const getData = async () => {
      const API = new APIAdapter();
      const data = await API.get('/offer');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.forEach((item: any) => {
        const trade = item.price === null ? 1 : 3;
        const type: number = item.is_trade ? trade : 2;
        const picturesBase64 = item.pictures;

        const user: User = {
          name: item.user.name,
          ratings: item.user.ratings_amount,
          sells: item.sells_amount,
          average: item.average,
        };

        // parse only one picture UPGRADE IF YOU CAN
        const pictures = parseBase64ToPictures(picturesBase64);
        pictures.then((pics) => {
          const offer: Offer = dataToOfferResume(item, user, type, pics);
          setOffers((state) => {
            const newState: Array<OfferResume> = [];
            state.forEach((stOffer) => {
              if (stOffer.id === offer.id) {
                newState.push({ ...offer, loading: false });
              } else {
                newState.push(stOffer);
              }
            });
            return newState;
          });
        });

        const offer: Offer = dataToOfferResume(item, user, type, []);

        setOffers((state) => [...state, { ...offer, loading: true }]);
      });
    };

    getData();
  }, []);

  return (
    <CardContainer>
      {!offers.length ? (
        <>
          <SkeletonCard
            variant="rect"
            width={600}
            height={400}
            animation="wave"
          />
          <SkeletonCard
            variant="rect"
            width={600}
            height={400}
            animation="wave"
          />

          <SkeletonCard
            variant="rect"
            width={600}
            height={400}
            animation="wave"
          />

          <SkeletonCard
            variant="rect"
            width={600}
            height={400}
            animation="wave"
          />

          <SkeletonRect
            variant="circle"
            width="24px"
            height="24px"
            animation="pulse"
          />

          <SkeletonRect
            variant="circle"
            width="24px"
            height="24px"
            animation="pulse"
          />

          <SkeletonRect
            variant="circle"
            width="24px"
            height="24px"
            animation="pulse"
          />
        </>
      ) : (
        offers.map((offer) => (
          <OfferCard loading={offer.loading} key={offer.id} offer={offer} />
        ))
      )}
    </CardContainer>
  );
};

export default Feed;
