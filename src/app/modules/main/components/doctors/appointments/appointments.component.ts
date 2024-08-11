import { Component, ViewChild } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
})
export class AppointmentsComponent {
  displayedColumns: string[] = [
    'day',
    'date',
    'start_time',
    'end_time',
    'doctor',
    'address',
    'phone',
    'email',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _appointmentService: AppointmentService,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this._appointmentService.getAppointmentsForAdmin().subscribe(
      (response) => {
        let data = response.data.reverse();
        this.dataSource = new MatTableDataSource<any>(data);

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
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
