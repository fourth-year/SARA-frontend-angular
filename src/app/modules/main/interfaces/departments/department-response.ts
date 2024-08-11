import { DepartmentData } from './department-data';

export interface DepartmentResponse {
  status: boolean;
  message: string;
  data: DepartmentData[];
}
