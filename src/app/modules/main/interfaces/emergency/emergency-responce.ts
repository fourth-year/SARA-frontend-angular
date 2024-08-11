import { EmergencyData } from './emergency-data';

export interface EmergencyResponse {
  success: boolean;
  message: string;
  data: EmergencyData[];
}
