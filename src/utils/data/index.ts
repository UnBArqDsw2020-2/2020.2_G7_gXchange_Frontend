import { Picture, User } from '../../models';

export const dataToOfferResume = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  user: User,
  type: number,
  pictures: Picture[],
) => {
  return {
    id: data.id,
    gameName: data.game_name,
    platform: data.platform,
    price: data.price,
    author: user,
    cep: data.cep,
    type,
    pictures,
    condition: data.condition,
    description: data.description,
  };
};
