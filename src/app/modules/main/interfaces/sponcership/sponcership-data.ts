import { AnimalData } from "../animal/animal-data";
import { UserData } from "../user/user-data";

export interface SponcershipData {
    sponcership_id: number;
    sponcership_date: string;
    spon_status: number;
    user: UserData;
    animal: AnimalData;
    created_at: string;
    updated_at: string;
}