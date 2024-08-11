import { DoctorsData } from './doctors-data';

export interface DoctorsResponse {
  success: boolean;
  message: string;
  data: DoctorsData[];
}
