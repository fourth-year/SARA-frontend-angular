import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionResponse } from '../interfaces/session/session-response';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public addSession(sessionData: any): Observable<SessionResponse> {
    return this._http.post<SessionResponse>(
      this._apiUrl + '/user/session/add',
      sessionData
    );
  }

  public getAllSessions(): Observable<SessionResponse>{
    return this._http.get<SessionResponse>(this._apiUrl + '/user/sessions');
  }
}
