import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorsResponse } from '../interfaces/doctors/doctors-response';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getAllDoctors(): Observable<DoctorsResponse> {
    return this._http.get<DoctorsResponse>(
      this._apiUrl + '/user/doctors/getall'
    );
  }

  public changeRole(userId: number, newRole: number): Observable<any> {
    return this._http.post<any>(this._apiUrl + '/user/change-role/' + userId, {
      new_role: newRole,
    });
  }

  public addDoctor(data: any): Observable<DoctorsResponse> {
    return this._http.post<DoctorsResponse>(
      this._apiUrl + '/user/doctor/add',
      data
    );
  }

  public deleteDoctor(doctorId: number): Observable<DoctorsResponse> {
    return this._http.delete<DoctorsResponse>(
      this._apiUrl + '/user/doctor/delete/' + doctorId
    );
  }
}
