import { Component, ViewChild } from '@angular/core';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { SelectOption } from '../../interfaces/select-option';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkingHourService } from '../../services/working-hour.service';
import { WorkingHoursListComponent } from './working-hours-list/working-hours-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-working-hours',
  templateUrl: './doctor-working-hours.component.html',
  styleUrl: './doctor-working-hours.component.css',
})
export class DoctorWorkingHoursComponent {
  @ViewChild('workingHoursList')
  workingHoursListComponent!: WorkingHoursListComponent;

  customTheme: NgxMaterialTimepickerTheme = {
    container: {
      buttonColor: '#dac0a3', // Button color
    },
    dial: {},
    clockFace: {
      clockHandColor: '#dac0a3', // Clock hand color
    },
  };

  workingDetailsForm = this._formBuilder.group(
    {
      day: [''],
      start_time: [''],
      end_time: [''],
    },
    { validators: this.timeValidator }
  );

  days: SelectOption[] = [
    { value: 'Saturday', viewValue: 'Saturday' },
    { value: 'Sunday', viewValue: 'Sunday' },
    { value: 'Monday', viewValue: 'Monday' },
    { value: 'Tuesday', viewValue: 'Tuesday' },
    { value: 'Wednesday', viewValue: 'Wednesday' },
    { value: 'Thursday', viewValue: 'Thursday' },
    { value: 'Friday', viewValue: 'Friday' },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

    private _workingHourService: WorkingHourService
  ) {}

  timeValidator(formGroup: FormGroup) {
    const startTime = formGroup.get('start_time')?.value;
    const endTime = formGroup.get('end_time')?.value;
    if (startTime && endTime && startTime >= endTime) {
      return { timeError: true };
    }
    return null;
  }

  public ngOnInit(): void {
    this._workingHourService.getAllWorkingHours().subscribe(
      (response) => {
        console.log(response);
        response.doctor_working_hours.forEach((element: any) => {
          this.days = this.days.filter((e) => e.value !== element.day);
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

  public clear(): void {
    this.workingDetailsForm.reset();
  }

  onSubmit() {
    if (this.workingDetailsForm.valid) {
      this._workingHourService
        .addWorkingHour(this.workingDetailsForm.value)
        .subscribe(
          (response) => {
            console.log(response);
            this.workingHoursListComponent.ngOnInit();
            this.clear();
          },
          (error) => {
            console.log(error);
            this._snackBar.open('adding failed! please try again', 'close', {
              panelClass: ['style-error'],
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
            });
          }
        );
    } else {
      // Handle form errors
    }
  }
}
