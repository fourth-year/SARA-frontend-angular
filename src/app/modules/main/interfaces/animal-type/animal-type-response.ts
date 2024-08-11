import { AnimalTypeDate } from './animal-type-data';

export interface AnimalTypeResponse {
  status: boolean;
  message: string;
  data: AnimalTypeDate[];
}
