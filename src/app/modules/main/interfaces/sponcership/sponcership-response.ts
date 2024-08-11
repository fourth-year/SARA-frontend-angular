import { SponcershipData } from './sponcership-data';

export interface SponcershipResponse {
  success: boolean;
  message: string;
  data: SponcershipData[] | SponcershipData;
}
