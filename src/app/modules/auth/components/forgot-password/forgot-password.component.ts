import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedDataService } from '../../../../core/services/shared-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  errorMessage: string = '';
  warningMessage: string = '';
  forgotPasswordForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _shareDataService: SharedDataService
  ) {}

  public submit(): void {
    this.errorMessage = '';
    this.warningMessage = 'The request has been sent please wait a moment';
    this._authService
      .forgotPassword(this.forgotPasswordForm.value as { email: string })
      .subscribe(
        (response) => {
          this.warningMessage = '';
          this._shareDataService.updateData(
            this.forgotPasswordForm.controls['email'].value as string
          );
          this._router.navigate(['auth/check-forgot-token']);
        },
        (error) => {
          this.warningMessage = '';
          this.errorMessage = error.error.message;
        }
      );
  }
}
