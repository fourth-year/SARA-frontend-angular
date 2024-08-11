import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CheckForgotTokenComponent } from './components/check-forgot-token/check-forgot-token.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { AuthService } from './services/auth.service';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
      LoginComponent,
      SignupComponent,
      ForgotPasswordComponent,
      CheckForgotTokenComponent,
      SetNewPasswordComponent,
      HomePageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
