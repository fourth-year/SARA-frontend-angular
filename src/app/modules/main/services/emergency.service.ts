import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmergencyResponse } from '../interfaces/emergency/emergency-responce';

@Injectable({
  providedIn: 'root',
})
export class EmergencyService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getAllEmergencies(): Observable<EmergencyResponse> {
    return this._http.get<EmergencyResponse>(
      this._apiUrl + '/user/emergency/getall',
      {
        params: {
          status: '1',
        },
      }
    );
  }

  public deleteEmergency(emergencyId: number): Observable<EmergencyResponse> {
    return this._http.delete<EmergencyResponse>(
      this._apiUrl + '/user/emergency/delete/' + emergencyId
    );
  }
}
