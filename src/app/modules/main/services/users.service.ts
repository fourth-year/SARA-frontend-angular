import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../interfaces/user/user-response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getAllUsers(): Observable<UserResponse> {
    return this._http.get<UserResponse>(this._apiUrl + '/users/all');
  }

  public chargeWallet(userId: number, amount: number): Observable<any> {
    return this._http.post<any>(this._apiUrl + '/user/wallet/charge/' + userId, {
      wallet: amount,
    });
  }
}
