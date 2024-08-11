import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-session-dialog',
  templateUrl: './session-dialog.component.html',
  styleUrl: './session-dialog.component.css',
})
export class SessionDialogComponent {
  isDateChanged: boolean = false;
  todayDate: Date = new Date();

  customTheme: NgxMaterialTimepickerTheme = {
    container: {
      buttonColor: '#dac0a3', // Button color
    },
    dial: {},
    clockFace: {
      clockHandColor: '#dac0a3', // Clock hand color
    },
  };

  sessionForm = this._formBuilder.group({
    title: [''],
    num_of_attendees: [''],
    date: [''],
    time: [''],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialogRef<SessionDialogComponent>
  ) {}

  public dateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.isDateChanged = true;
  }

  public doAction(): void {
    if (this.isDateChanged) {
      let date = this.sessionForm.controls['date'].value as unknown as Date;
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
      this.sessionForm.controls['date'].patchValue(fullDate);
    }

    console.log(this.sessionForm.value);
    this._dialog.close({
      data: this.sessionForm.value,
    });
  }

  public closeDialog(): void {
    this._dialog.close(null);
  }
}
