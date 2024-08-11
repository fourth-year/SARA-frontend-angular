import { Component } from '@angular/core';
import { WorkingHourService } from '../../../services/working-hour.service';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-working-hours-list',
  templateUrl: './working-hours-list.component.html',
  styleUrl: './working-hours-list.component.css',
})
export class WorkingHoursListComponent {
  workingHourList: any;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _workingHourService: WorkingHourService
  ) {}

  public ngOnInit(): void {
    this._workingHourService.getAllWorkingHours().subscribe(
      (response) => {
        console.log(response);
        this.workingHourList = response.doctor_working_hours;
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

  onDelete(day: string): void {
    this._dialog
      .open(ConfirmDeleteComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to delete this working detail?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._workingHourService.deleteWorkingHour(day).subscribe(
            (response) => {
              console.log(response);
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
}
