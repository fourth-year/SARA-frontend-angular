import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SessionDialogComponent } from './session-dialog/session-dialog.component';
import { SessionService } from '../../services/session.service';
import { SessionData } from '../../interfaces/session/session-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent {
  sessionList!: SessionData[];

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _sessionService: SessionService
  ) {}

  public ngOnInit(): void {
    this._sessionService.getAllSessions().subscribe(
      (response) => {
        this.sessionList = response.data as SessionData[];
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

  public openDialog(): void {
    const dialog = this._dialog.open(SessionDialogComponent, {
      width: '500px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this._sessionService.addSession(result.data).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
            this._snackBar.open(
              'deleting session failed! please try again',
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
