import { UserData } from '../user/user-data';

export interface EmployeesData {
  id: number;
  age: number;
  job_title: string;
  start_time: string;
  end_time: string;
  user_id: number;
  is_verified: number;
  created_at: string;
  updated_at: string;
  user: UserData;
}
