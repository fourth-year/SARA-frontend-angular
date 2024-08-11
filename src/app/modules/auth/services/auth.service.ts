import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SignUpData } from '../interfaces/sign-up-data';
import { UserData } from '../interfaces/user-data';
import { environment } from '../../../../environments/environment.development';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUrl: string = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _tokenStorageService: TokenStorageService
  ) {}

  public signup(signupData: SignUpData): Observable<UserData> {
    return this._http.post<UserData>(
      this._authUrl + '/user/signup',
      signupData
    );
  }

  public login(
    loginData:
      | { name: string; password: string }
      | { email: string; password: string }
  ): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(
      this._authUrl + '/user/signin',
      loginData
    );
  }

  public logout(): Observable<any> {
    return this._http.post<any>(this._authUrl + '/user/logout', {});
  }

  public forgotPassword(data: {
    email: string;
  }): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(
      this._authUrl + '/password/email',
      data
    );
  }

  public checkToken(data: { code: string }): Observable<{ message: string }> {
    return this._http.post<{ message: string }>(
      this._authUrl + '/password/code/check',
      data
    );
  }

  public resetPassword(data: {
    code: string;
    password: string;
    c_password: string;
  }): Observable<{ message: string }> {
    console.log(data);
    return this._http.post<{ message: string }>(
      this._authUrl + '/password/reset',
      data
    );
  }

  public isLoggedIn(): boolean {
    if (this._tokenStorageService.getFromLocalStorage('token') !== null) {
      return true;
    }
    return false;
  }

  public updateProfile(userId: number, data: any): Observable<any> {
    return this._http.post<any>(this._authUrl + '/user/update/' + userId, data);
  }
}
