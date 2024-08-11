import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdoptionResponse } from '../interfaces/adoption/adoption-response';

@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getAllPendingAdoption(): Observable<AdoptionResponse> {
    return this._http.get<AdoptionResponse>(
      this._apiUrl + '/user/adoptions/pendingadoption/getall'
    );
  }

  public approveReq(adop_id: number): Observable<AdoptionResponse> {
    return this._http.post<AdoptionResponse>(
      this._apiUrl + '/user/adoption/updatereq/' + adop_id,
      ''
    );
  }

  public getAllAcceptedAdoption(): Observable<AdoptionResponse> {
    return this._http.get<AdoptionResponse>(
      this._apiUrl + '/user/adoptions/acceptingadoption/getall'
    );
  }
}
