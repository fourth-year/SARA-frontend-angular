import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../../../core/services/token-storage.service';

import { LoginResponse } from '../../interfaces/login-response';
import { CookieStorageService } from '../../../../core/services/cookie-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hidePassword = true;
  errorMessage: [] = [];
  theme!: string;

  loginForm = this._formBuilder.group({
    emailOrName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _tokenStorageService: TokenStorageService,
    private cookieStorageService: CookieStorageService
  ) {}

  public ngOnInit(): void {
    this.theme = this.cookieStorageService.getThemeCookie();
  }

  public login(): void {
    this.errorMessage = [];
    let loginData;
    if (this.loginForm.get('emailOrName')?.value?.includes('@gmail.com')) {
      loginData = {
        email: this.loginForm.controls['emailOrName'].value as string,
        password: this.loginForm.controls['password'].value as string,
      };
    } else {
      loginData = {
        password: this.loginForm.controls['password'].value as string,
        name: this.loginForm.controls['emailOrName'].value as string,
      };
    }
    this._authService.login(loginData).subscribe(
      (response: LoginResponse) => {
        this._tokenStorageService.saveToLocalStorage('token', response.Token);
        this._tokenStorageService.saveToLocalStorage(
          'user',
          JSON.stringify(response.user)
        );
        this._tokenStorageService.saveToLocalStorage(
          'role',
          JSON.stringify(+response.user.role)
        );
        this._router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error;
      }
    );
  }
}
