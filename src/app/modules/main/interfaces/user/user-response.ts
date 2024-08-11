import { UserData } from './user-data';

export interface UserResponse {
  success: boolean;
  message: string;
  data: UserData[];
}
