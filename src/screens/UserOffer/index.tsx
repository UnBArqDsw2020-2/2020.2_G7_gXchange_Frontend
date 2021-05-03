import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import APIAdapter from '../../services/api';
import OfferCard from '../Offer/OfferCard';
import { User, OfferResume as Offer } from '../../models';
import { CardContainer, SkeletonCard, SkeletonRect } from './styles';
import { parseBase64ToPictures } from '../../utils/images';
import { dataToOfferResume } from '../../utils/data';
import { openModal } from '../../store/GlobalModal';

interface OfferResume extends Offer {
  loading: boolean;
}

const UserOffer: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState<OfferResume[]>([]);

  const getData = async () => {
    setLoading(true);
    try {
      const API = new APIAdapter();
      const data = await API.get('user/offers');

      setOffers([]);

      data.forEach((item: any) => {
        const trade = item.price === null ? 1 : 3;
        const type: number = item.is_trade ? trade : 2;
        const picturesBase64 = item.pictures;

        const user: User = {
          name: item.user.name,
          average: item.user.average,
          sells: item.user.sells_amount,
          ratings: item.user.ratings_amount,
        };

        const pictures = parseBase64ToPictures(picturesBase64);

        pictures.then((pics) => {
          const offer: Offer = dataToOfferResume(item, user, type, pics);

          setOffers((state) => {
            const newState: OfferResume[] = [];

            state.forEach((stOffer) => {
              if (stOffer.id === offer.id)
                newState.push({ ...offer, loading: false });
              else newState.push(stOffer);
            });

            return newState;
          });
        });

        const offer: Offer = dataToOfferResume(item, user, type, []);

        setOffers((state) => [...state, { ...offer, loading: true }]);
      });
    } catch {
      dispatch(
        openModal({
          title: 'Erro',
          type: 'error',
          content: 'Falha ao carregar as ofertas',
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardContainer>
      {loading ? (
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
      ) : offers.length ? (
        offers.map((offer) => (
          <OfferCard
            reloadOffers={() => getData()}
            loading={offer.loading}
            key={offer.id}
            offer={offer}
            userOffer
          />
        ))
      ) : (
        <h2 style={{ marginTop: '50px', color: 'var(--gray)' }}>
          Você não possui nenhuma oferta cadastrada
        </h2>
      )}
    </CardContainer>
  );
};

export default UserOffer;
