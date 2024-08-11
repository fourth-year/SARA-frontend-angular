import { Component, Inject, Optional } from '@angular/core';
import { AppointmentService } from '../../../../services/appointment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentData } from '../../../../interfaces/appointment/appointment-data';
import { SelectOption } from '../../../../interfaces/select-option';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.css',
})
export class AppointmentDialogComponent {
  userId: any;
  availableAppointments: AppointmentData[] = [];
  loaded = false;
  selected!: AppointmentData;
  day: SelectOption[] = [];
  selectedAppointments!: AppointmentData[];
  option = '';

  isDateChanged: boolean = false;
  todayDate: Date = new Date();
  date = '';

  firstFormGroup = this._formBuilder.group({
    day: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    date: ['', Validators.required],
  });
  isEditable = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialogRef<AppointmentDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _appointmentService: AppointmentService
  ) {
    this.userId = data.doctorId;
  }

  public ngOnInit(): void {
    this._appointmentService.GetWorkingDay(this.userId).subscribe(
      (response) => {
        let i = 1;
        response.data.forEach((element) => {
          this.day.push({ value: i, viewValue: element.toString() });
          i++;
        });
      },
      (error) => {
        console.log(error);
        this._snackBar.open('something went wrong! please refresh', 'close', {
          panelClass: ['style-error'],
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  // Filter function that enables only the days specified in the allowedDays array
  customDayFilter = (date: Date | null): boolean => {
    let allowedDays = [0]; //

    switch (this.firstFormGroup.controls['day'].value) {
      case 'Sunday':
        allowedDays = [0];
        break;
      case 'Monday':
        allowedDays = [1];
        break;
      case 'Tuesday':
        allowedDays = [2];
        break;
      case 'Wednesday':
        allowedDays = [3];
        break;
      case 'Thursday':
        allowedDays = [4];
        break;
      case 'Friday':
        allowedDays = [5];
        break;
      case 'Saturday':
        allowedDays = [6];
        break;
    }

    const day = (date || new Date()).getDay();
    return allowedDays!.includes(day);
  };

  public changedSelection(): void {
    this.selectedAppointments = this.availableAppointments.filter((e) => {
      return e.day === this.option;
    });
  }

  public getAvailableTimes(): void {
    if (this.isDateChanged) {
      console.log('fdf');

      let date = this.secondFormGroup.controls['date'].value as unknown as Date;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let finalDay;
      let finalMonth;
      if (day < 10) {
        finalDay = '0' + day;
      } else {
        finalDay = day;
      }

      if (month < 10) {
        finalMonth = '0' + month;
      } else {
        finalMonth = month;
      }

      let fullDate = year + '-' + finalMonth + '-' + finalDay;

      console.log(this.secondFormGroup.controls.date.value);
      this._appointmentService
        .getNotBookedAppointments(this.userId, fullDate)
        .subscribe(
          (response) => {
            console.log(response);
            this.availableAppointments = response.data as AppointmentData[];
            this.loaded = true;
            console.log('dsdsdfdgfhgfds', this.availableAppointments);
          },
          (error) => {
            console.log(error);
            this._snackBar.open(
              'something went wrong! please refresh',
              'close',
              {
                panelClass: ['style-error'],
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
              }
            );
          }
        );
    }
  }

  public selectAppointment(appointment: AppointmentData): void {
    this.selected = appointment;
    console.log(this.selected.start_time.slice(0, 5));

    console.log(this.option);
  }

  public saveAppointment(): void {
    let date = this.secondFormGroup.controls['date'].value as unknown as Date;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let finalDay;
    let finalMonth;
    if (day < 10) {
      finalDay = '0' + day;
    } else {
      finalDay = day;
    }

    if (month < 10) {
      finalMonth = '0' + month;
    } else {
      finalMonth = month;
    }

    let fullDate = year + '-' + finalMonth + '-' + finalDay;

    console.log('date', fullDate);
    this._appointmentService
      .bookAppointment({
        doctor_id: this.userId,
        day: this.firstFormGroup.controls['day'].value,
        reserved_time: this.selected.start_time.slice(0, 5),
        app_date: fullDate,
      })
      .subscribe(
        (response) => {
          console.log(response);
          this._dialog.close();
        },
        (error) => {
          console.log(error);
          this._snackBar.open(
            'booking appointment failed! please try again',
            'close',
            {
              panelClass: ['style-error'],
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
            }
          );
        }
      );
  }

  public dateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.isDateChanged = true;
  }
  public closeDialog(): void {
    this._dialog.close();
  }
}
