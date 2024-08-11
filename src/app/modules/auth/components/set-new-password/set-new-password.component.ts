import { Component } from '@angular/core';
import { SharedDataService } from '../../../../core/services/shared-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrl: './set-new-password.component.css',
})
export class SetNewPasswordComponent {
  hidePassword: boolean = false;
  hideConfirmPassword: boolean = false;
  errorMessage: [] = [];
  code: string = '';

  setNewPasswordForm = this._formBuilder.group({
    code: [this.code],
    password: ['', [Validators.required]],
    c_password: ['', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _sharedDataService: SharedDataService,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
    this._sharedDataService.share.subscribe((data) => {
      this.code = data;
    });
    this.setNewPasswordForm.controls['code'].patchValue(this.code);
  }

  public resetPassword(): void {
    this.errorMessage = [];
    this._authService
      .resetPassword(
        this.setNewPasswordForm.value as {
          code: string;
          password: string;
          c_password: string;
        }
      )
      .subscribe(
        (response) => {
          this._router.navigate(['/auth/login']);
        },
        (error) => {
          this.errorMessage = error.error;
        }
      );
  }
}
