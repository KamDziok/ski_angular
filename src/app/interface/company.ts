import { Picture } from './picture';
export interface Company {
  id: number;
  name: string;
  active: boolean;
  description: string;
  profilePicture: Picture;
}
