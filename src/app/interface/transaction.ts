import {User} from './user';
import {OfferSki} from './offer-ski';

export interface Transaction {
  id: number;
  prepareTransaction: Date;
  startTransaction: Date;
  stopTransaction: Date;
  user: User;
  offerSkiList: OfferSki[];
}
