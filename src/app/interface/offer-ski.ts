import { Picture } from './picture';
import {Company} from './company';
import {Ski} from './ski';

export interface OfferSki {
  id: number;
  city: string;
  startOffer: Date;
  stopOffer: Date;
  quantity: number;
  company: Company;
  priceForDay: number;
  ski: Ski;
  pictures: Picture[];
}
