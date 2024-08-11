import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkingHourService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public addWorkingHour(data: any): Observable<any> {
    return this._http.post<any>(
      this._apiUrl + '/user/doctor/working-hours/add',
      data
    );
  }

  public getAllWorkingHours(): Observable<any> {
    return this._http.get<any>(
      this._apiUrl + '/user/doctor/working-hours/getfordoctor'
    );
  }

  public deleteWorkingHour(day: string): Observable<any> {
    return this._http.delete<any>(
      this._apiUrl + '/user/doctor/working-hours/delete',
      {
        params: {
          day: day,
        },
      }
    );
  }
}
