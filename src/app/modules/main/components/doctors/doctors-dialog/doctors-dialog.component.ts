import { Component, Inject, Optional } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorsData } from '../../../interfaces/doctors/doctors-data';
import { DoctorsService } from '../../../services/doctors.service';
import { AuthService } from '../../../../auth/services/auth.service';
import { SignUpData } from '../../../../auth/interfaces/sign-up-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctors-dialog',
  templateUrl: './doctors-dialog.component.html',
  styleUrl: './doctors-dialog.component.css',
})
export class DoctorsDialogComponent {
  file: string = '';
  hidePassword: boolean = false;
  hideConfirmPassword: boolean = false;

  doctorForm = this._formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    c_password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    photo: [''],
    gender: ['male', [Validators.required]],
  });
  age: number | null = null;
  address: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialogRef<DoctorsDialogComponent>,
    private _snackBar: MatSnackBar,
    private _doctorsService: DoctorsService,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {}

  public onFileChange(event: any): void {
    const files = event.target.files as FileList;
    // convert the image file to base64
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.doctorForm.controls['photo'].patchValue(reader.result as string);
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

  public onAdd(): void {
    this._authService.signup(this.doctorForm.value as SignUpData).subscribe(
      (response) => {
        this._doctorsService
          .changeRole(response.user.id, 3)
          .subscribe((re: any) => {
            this._doctorsService
              .addDoctor({
                age: this.age,
                address: this.address,
                user_id: response.user.id,
              })
              .subscribe(
                (res) => {
                  console.log(res);
                  this._dialog.close({ event: 'added' });
                },
                (error) => {
                  console.log(error);
                  this._snackBar.open(
                    'adding doctor failed! please try again',
                    'close',
                    {
                      panelClass: ['style-error'],
                      horizontalPosition: 'end',
                      verticalPosition: 'bottom',
                    }
                  );
                }
              );
          });
      },
      (error) => {
        console.log(error);
        this._snackBar.open('adding doctor failed! please try again', 'close', {
          panelClass: ['style-error'],
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  public closeDialog(): void {
    this._dialog.close({ event: 'cencel' });
  }
}
