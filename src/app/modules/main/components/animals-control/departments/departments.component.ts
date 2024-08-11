import { Component, ViewChild } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent {
  newDepartmentName: string = '';
  newDepartmentNumber: number | null = null;

  @ViewChild('departmentsList')
  departmnetsListComponent!: DepartmentsListComponent;

  constructor(private _departmentService: DepartmentService,     private _snackBar: MatSnackBar,
  ) {}

  public addDepartment(): void {
    if (this.newDepartmentName != '' && this.newDepartmentNumber != null) {
      this._departmentService
        .addDepartment(this.newDepartmentName, this.newDepartmentNumber)
        .subscribe(
          (response) => {
            this.departmnetsListComponent.ngOnInit();
            this.newDepartmentName = '';
            this.newDepartmentNumber = null;
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
    }
  }

  public clear(): void {
    this.newDepartmentName = '';
    this.newDepartmentNumber = null;
  }
}
