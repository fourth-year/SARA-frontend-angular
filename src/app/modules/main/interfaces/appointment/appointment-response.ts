import { AppointmentData } from './appointment-data';

export interface AppointmentResponse {
  success: boolean;
  message: string;
  data: AppointmentData[] | string[];
}
