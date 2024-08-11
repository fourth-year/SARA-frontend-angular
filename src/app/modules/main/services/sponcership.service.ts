import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SponcershipResponse } from '../interfaces/sponcership/sponcership-response';

@Injectable({
  providedIn: 'root',
})
export class SponcershipService {
  private _apiUrl: string = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  public getAllPendingSponcership(): Observable<SponcershipResponse> {
    return this._http.get<SponcershipResponse>(
      this._apiUrl + '/user/sponcerships/pendingsponcership/getall'
    );
  }

  public approveReq(spon_id: number): Observable<SponcershipResponse> {
    return this._http.post<SponcershipResponse>(
      this._apiUrl + '/user/sponcership/updatespon/' + spon_id,
      ''
    );
  }

  public getAllAcceptedSponcership(): Observable<SponcershipResponse> {
    return this._http.get<SponcershipResponse>(
      this._apiUrl + '/user/sponcerships/acceptingsponcership/getall'
    );
  }
}
