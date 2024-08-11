import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { AnimalData } from '../../interfaces/animal/animal-data';
import { AnimalsService } from '../../services/animals.service';
import { AnimalDialogComponent } from '../animals-control/animals/animal-dialog/animal-dialog.component';
import { AppointmentService } from '../../services/appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrl: './doctor-appointments.component.css',
})
export class DoctorAppointmentsComponent {
  displayedColumns: string[] = ['day', 'date', 'start_time', 'end_time'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _appointmentService: AppointmentService,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this._appointmentService.getAppointmentsForDoctor().subscribe(
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
