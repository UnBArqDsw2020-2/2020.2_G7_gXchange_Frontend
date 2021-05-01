import { Picture } from './Picture';
import { User } from './User';

export interface OfferResume {
  author: User;
  id: number;
  cep: string;
  type: number;
  price: number;
  gameName: string;
  platform: string;
  condition: number;
  description: string;
  pictures: Picture[];
}
