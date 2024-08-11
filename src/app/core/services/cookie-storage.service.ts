import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieStorageService {
  constructor(private _cookieService: CookieService) {}

  public setThemeCookie(theme: string) {
    this._cookieService.set('theme', theme);
  }

  public getThemeCookie() {
    return this._cookieService.get('theme');
  }

  public removeThemeCookie() {
    this._cookieService.delete('theme');
  }
}
