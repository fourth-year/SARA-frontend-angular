import { Component } from '@angular/core';
import { EmergencyService } from '../../services/emergency.service';
import { EmergencyData } from '../../interfaces/emergency/emergency-data';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.css',
})
export class EmergencyComponent {
  emergencies!: EmergencyData[];

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _emergencyService: EmergencyService
  ) {}

  public ngOnInit(): void {
    this._emergencyService.getAllEmergencies().subscribe(
      (response) => {
        this.emergencies = response.data.reverse();
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

  public onDelete(emergencyId: number): void {
    this._dialog
      .open(ConfirmDeleteComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to delete this emergency?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._emergencyService.deleteEmergency(emergencyId).subscribe(
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
}
