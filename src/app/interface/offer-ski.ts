import {Company} from './company';
import {Price} from './price';
import {Ski} from './ski';

export interface OfferSki {
  id: number;
  city: string;
  startOffer: Date;
  stopOffer: Date;
  quantity: number;
  company: Company;
  price: Price;
  ski: Ski;
}
