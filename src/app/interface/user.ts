import {Company} from './company';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  eMail: string;
  password: string;
  permissions: number;
  company: Company;
}
