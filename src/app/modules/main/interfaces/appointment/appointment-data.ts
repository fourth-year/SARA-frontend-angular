export interface AppointmentData {
  id: number;
  doctor_id: number;
  day: string;
  start_time: string;
  end_time: string;
  status: number;
  created_at: null | string;
  updated_at: null | string;
}
