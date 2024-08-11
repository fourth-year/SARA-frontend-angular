import { AnimalData } from './animal-data';

export interface AnimalResponse {
  status: boolean;
  message: string;
  data: AnimalData[];
}
