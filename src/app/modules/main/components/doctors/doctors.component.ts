import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../../interfaces/user/user-data';
import { UsersService } from '../../services/users.service';
import { UserDialogComponent } from '../users/user-dialog/user-dialog.component';
import { DoctorsService } from '../../services/doctors.service';
import { DoctorsData } from '../../interfaces/doctors/doctors-data';
import { DoctorsDialogComponent } from './doctors-dialog/doctors-dialog.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { AppointmentDialogComponent } from './appointments/appointment-dialog/appointment-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _doctorsService: DoctorsService
  ) {}

  public ngOnInit(): void {
    this._doctorsService.getAllDoctors().subscribe(
      (response) => {
        console.log(response);
        this.dataSource.data = response.data;
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

  public addDoctorDialog(): void {
    const dialog = this._dialog.open(DoctorsDialogComponent, {
      width: '900px',
      height: '550px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result.event === 'added') {
          this.ngOnInit();
        }
      }
    });
  }

  public onDelete(doctor: DoctorsData): void {
    this._dialog
      .open(ConfirmDeleteComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to delete this doctor?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._doctorsService.deleteDoctor(doctor.id).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (error) => {
              console.log(error);
              this._snackBar.open(
                'deleting failed! please try again',
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
      });
  }

  public openDialog(userId: number): void {
    const dialog = this._dialog.open(AppointmentDialogComponent, {
      width: '520px',
      data: {
        doctorId: userId,
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result.event === 'Add') {
        }
      }
    });
  }
}
