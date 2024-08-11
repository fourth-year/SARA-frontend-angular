import { DatePipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimalData } from '../../../interfaces/animal/animal-data';
import { SelectOption } from '../../../interfaces/select-option';
import { AnimalTypeService } from '../../../services/animal-type.service';
import { DepartmentService } from '../../../services/department.service';
import { AnimalDialogComponent } from '../../animals-control/animals/animal-dialog/animal-dialog.component';
import { MedicalRecordData } from '../../../interfaces/medical-record/medical-record-data';

@Component({
  selector: 'app-mdical-record-dialog',
  templateUrl: './mdical-record-dialog.component.html',
  styleUrl: './mdical-record-dialog.component.css',
})
export class MdicalRecordDialogComponent {
  action: string = '';
  record: MedicalRecordData | undefined;
  date = '';
  isDateChanged: boolean = false;

  recordForm = this._formBuiler.group({
    date: [''],
    description: [''],
    animal_id: [''],
    doctor_id: [0],
    updated_at: [''],
    created_at: [''],
    id: [0],
  });

  constructor(
    private _formBuiler: FormBuilder,
    public datepipe: DatePipe,
    private _dialog: MatDialogRef<MdicalRecordDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.record = data.data;
    this.recordForm.patchValue(data.data);
    this.recordForm.controls['animal_id'].patchValue(data.animalId);
  }

  public ngOnInit(): void {
    this.action =
      this.recordForm.get('id'.toString())?.value > 0 ? 'Update' : 'Add';
    let date = this.datepipe.transform(this.data.data.date, 'dd/MM/yyyy');
    //this.animalForm.controls['entry_date'].patchValue(date);
  }

  public dateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.isDateChanged = true;
  }

  public doAction(): void {
    if (this.action === 'Add' || this.isDateChanged) {
      let date = this.recordForm.controls['date'].value as unknown as Date;
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
      this.recordForm.controls['date'].patchValue(fullDate);
    }

    this._dialog.close({
      data: this.recordForm.value,
      event: this.recordForm.get('id'.toString())?.value > 0 ? 'Update' : 'Add',
    });
  }

  public closeDialog(): void {
    this._dialog.close({ event: 'cencel' });
  }
}
