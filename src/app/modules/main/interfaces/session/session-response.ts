import { SessionData } from './session-data';

export interface SessionResponse {
  success: boolean;
  message: string;
  data: SessionData | SessionData[];
}
