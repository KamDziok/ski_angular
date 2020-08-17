import {Producer} from './producer';

export interface Ski {
  id: number;
  name: string;
  lengthSki: number;
  type: string;
  producer: Producer;
}
