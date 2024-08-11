import { AnimalData } from '../animal/animal-data';
import { UserData } from '../user/user-data';

export interface AdoptionData {
  adoption_id: number;
  adoption_date: string;
  adop_status: number;
  user: UserData;
  animal: AnimalData;
}
