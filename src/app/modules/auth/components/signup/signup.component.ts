import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpData } from '../../interfaces/sign-up-data';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../interfaces/user-data';
import { TokenStorageService } from '../../../../core/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  hidePassword: boolean = false;
  hideConfirmPassword: boolean = false;
  file: string = '';
  errorMessage: [] = [];

  signupForm = this._formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    c_password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    photo: [''],
    gender: ['male', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _tokenStorageService: TokenStorageService
  ) {}

  public onFileChange(event: any): void {
    const files = event.target.files as FileList;
    // convert the image file to base64
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.signupForm.controls['photo'].patchValue(reader.result as string);
    };

    //////////////////////////////////// end
    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.resetInput();
    }
  }

  public resetInput(): void {
    const input = document.getElementById(
      'avatar-input-file'
    ) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  public signup(): void {
    this.errorMessage = [];
    if (this.signupForm.valid) {
      this._authService.signup(this.signupForm.value as SignUpData).subscribe(
        (response: UserData) => {
          this._tokenStorageService.saveToLocalStorage(
            'token',
            response.access_token
          );
          this._tokenStorageService.saveToLocalStorage(
            'user',
            JSON.stringify(response.user)
          );
          this._router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error.error;
        }
      );
    }
  }
}
