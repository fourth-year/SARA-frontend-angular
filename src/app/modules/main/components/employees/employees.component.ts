import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { EmployeesService } from '../../services/employees.service';
import { EmployeesData } from '../../interfaces/employees/employees-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  displayedColumns: string[] = [
    'name',
    'email',
    'age',
    'start-time',
    'end-time',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _employeesService: EmployeesService
  ) {}

  public ngOnInit(): void {
    this._employeesService.getAllEmployees().subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<any>(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onDelete(emp: EmployeesData): void {
    this._dialog
      .open(ConfirmDeleteComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to delete this employee?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._employeesService.deleteEmployee(emp.id).subscribe(
            (response) => {
              this._employeesService.changeRole(emp.user_id, 1).subscribe(
                (resp) => {
                  this.ngOnInit();
                },
                (err) => {
                  console.log(err);
                  this._snackBar.open('deleting failed! please refresh', 'close', {
                    panelClass: ['style-error'],
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom',
                  });
                }
              );
            },
            (error) => {
              console.log(error);
              this._snackBar.open('deleting failed! please refresh', 'close', {
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
