import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { AnimalData } from '../../../../interfaces/animal/animal-data';
import { SelectOption } from '../../../../interfaces/select-option';
import { AnimalTypeService } from '../../../../services/animal-type.service';
import { DepartmentService } from '../../../../services/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-animal-dialog',
  templateUrl: './animal-dialog.component.html',
  styleUrl: './animal-dialog.component.css',
})
export class AnimalDialogComponent {
  file: string = '';
  action: string = '';
  animal: AnimalData | undefined;
  date = '';
  isDateChanged: boolean = false;

  animalTypes: SelectOption[] = [];

  departments: SelectOption[] = [];

  health: SelectOption[] = [
    { value: 'healthy', viewValue: 'healthy' },
    { value: 'unhealthy', viewValue: 'unhealthy' },
    { value: 'under treatment', viewValue: 'under treatment' },
  ];

  animalForm = this._formBuiler.group({
    id: [0],
    name: [''],
    age: [''],
    photo: [''],
    health: ['healthy'],
    entry_date: [''],
    department_id: [''],
    animaltype_id: [''],
    type: [''],
    department: [''],
  });

  constructor(
    private _formBuiler: FormBuilder,
    public datepipe: DatePipe,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialogRef<AnimalDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AnimalData,
    private _animalTypeService: AnimalTypeService,
    private _departmentService: DepartmentService
  ) {
    this.animal = data;
    this.animalForm.patchValue(data);
    this._animalTypeService.getAllAnimalsTypes().subscribe(
      (response) => {
        response.data.forEach((element) => {
          this.animalTypes.push({ value: element.id, viewValue: element.type });
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

    this._departmentService.getAllDepartments().subscribe(
      (response) => {
        response.data.forEach((element) => {
          this.departments.push({
            value: element.id,
            viewValue: element.name,
          });
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

  public ngOnInit(): void {
    this.action =
      this.animalForm.get('id'.toString())?.value > 0 ? 'Update' : 'Add';
    let date = this.datepipe.transform(this.data.entry_date, 'dd/MM/yyyy');
    //this.animalForm.controls['entry_date'].patchValue(date);
    this.file = this.data.photo;
  }

  public dateChanged(event: MatDatepickerInputEvent<Date>): void {
    this.isDateChanged = true;
  }

  public doAction(): void {
    if (this.action === 'Add' || this.isDateChanged) {
      let date = this.animalForm.controls['entry_date']
        .value as unknown as Date;
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
      this.animalForm.controls['entry_date'].patchValue(fullDate);
    }

    this._dialog.close({
      data: this.animalForm.value,
      event: this.animalForm.get('id'.toString())?.value > 0 ? 'Update' : 'Add',
    });
  }

  public closeDialog(): void {
    this._dialog.close({ event: 'cencel' });
  }

  public onFileChange(event: any): void {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      let file = files[0];
      let reader = new FileReader();

      // Read the file as a DataURL (base64 string)
      reader.readAsDataURL(file);

      reader.onload = () => {
        // Get the base64 string without the prefix
        const base64String = (reader.result as string).split(',')[1];

        // Update form control with the base64 string
        this.animalForm.controls['photo'].patchValue(base64String);

        // For preview purposes, use the full base64 string with the prefix
        this.file = base64String as string; // This includes 'data:image/jpeg;base64,...'

        // Reset the input file field if needed
        this.resetInput();
      };
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
}
