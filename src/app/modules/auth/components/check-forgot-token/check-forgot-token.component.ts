import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-check-forgot-token',
  templateUrl: './check-forgot-token.component.html',
  styleUrl: './check-forgot-token.component.css',
})
export class CheckForgotTokenComponent {
  errorMessage: string = '';
  warningMessage: string = '';
  email: string = '';
  checkTokenForm = this._formBuilder.group({
    code: ['', [Validators.required]],
  });

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _shareDataService: SharedDataService,
    private _authService: AuthService
  ) {}

 public ngOnInit(): void{
    this._shareDataService.share.subscribe((data) => {
      this.email = data;
    });
  }

  public verifyCode(): void {
    this.errorMessage = '';
    this.warningMessage = '';
    this._authService
      .checkToken(this.checkTokenForm.value as { code: string })
      .subscribe(
        (response) => {
          this._shareDataService.updateData(
            this.checkTokenForm.controls['code'].value as string
          );
          this._router.navigate(['/auth/set-new-password']);
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }

  public resend(): void {
    this.errorMessage = '';
    this.warningMessage = 'The request has been sent please wait a moment';
    this._authService.forgotPassword({ email: this.email }).subscribe(
      (response) => {
        this.warningMessage = 'A new email has been sent';
      },
      (error) => {
        this.warningMessage = '';
        this.errorMessage = error.error.message;
      }
    );
  }
}
