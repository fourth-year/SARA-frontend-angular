import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentResponse } from '../interfaces/appointment/appointment-response';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private _apiUrl: string = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  public GetWorkingDay(userId: number): Observable<AppointmentResponse> {
    return this._http.get<AppointmentResponse>(
      this._apiUrl + '/user/doctor/working-days/get/' + userId
    );
  }

  public getNotBookedAppointments(
    userId: number,
    date: string
  ): Observable<AppointmentResponse> {
    return this._http.get<AppointmentResponse>(
      this._apiUrl + '/user/appointment/getfreeappfordate/' + userId,
      {
        params: {
          date: date,
        },
      }
    );
  }

  public bookAppointment(data: any): Observable<any> {
    return this._http.post<any>(this._apiUrl + '/user/appointments/add', data);
  }

  public getAppointmentsForAdmin(): Observable<any> {
    return this._http.get<any>(this._apiUrl + '/user/appointments/admin/all');
  }

  public getAppointmentsForDoctor(): Observable<any> {
    return this._http.get<any>(this._apiUrl + '/user/appointments/doctor/all');
  }
}
