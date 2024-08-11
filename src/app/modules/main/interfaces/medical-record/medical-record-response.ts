import { MedicalRecordData } from './medical-record-data';

export interface MedicalRecordResponse {
  success: boolean;
  message: string;
  data: MedicalRecordData[] | MedicalRecordData;
}
