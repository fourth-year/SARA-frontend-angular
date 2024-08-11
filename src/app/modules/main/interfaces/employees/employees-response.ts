import { EmployeesData } from './employees-data';

export interface EmployeesResponse {
  success: boolean;
  message: string;
  data: EmployeesData[];
}
