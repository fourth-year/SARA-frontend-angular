import { UserData } from '../user/user-data';

export interface DoctorsData {
  id: number;
  age: number;
  address: string;
  user: UserData;
  created_at: string;
  updated_at: string;
}
