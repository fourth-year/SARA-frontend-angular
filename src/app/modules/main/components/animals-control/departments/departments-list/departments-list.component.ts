import { Component } from '@angular/core';
import { DepartmentService } from '../../../../services/department.service';
import { DepartmentData } from '../../../../interfaces/departments/department-data';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../../../../../shared/components/confirm-delete/confirm-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrl: './departments-list.component.css',
})
export class DepartmentsListComponent {
  departments!: DepartmentData[];

  constructor(
    private _departmentService: DepartmentService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,

  ) {}

  ngOnInit() {
    this._departmentService.getAllDepartments().subscribe(
      (response) => {
        this.departments = response.data;
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

  public onDelete(departmentId: number): void {
    this._dialog
      .open(ConfirmDeleteComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to delete this type?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._departmentService.deleteDepartment(departmentId).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (error) => {
              console.log(error);
              this._snackBar.open('deleting failed! please try again', 'close', {
                panelClass: ['style-error'],
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
              });
            }
          );
        }
      });
  }
}
