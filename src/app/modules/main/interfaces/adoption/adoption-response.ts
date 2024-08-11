import { AdoptionData } from './adoption-data';

export interface AdoptionResponse {
  success: boolean;
  message: string;
  data: AdoptionData[] | AdoptionData;
}
