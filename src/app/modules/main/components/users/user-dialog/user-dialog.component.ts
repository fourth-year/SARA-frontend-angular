import { Component, Inject, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserData } from '../../../interfaces/user/user-data';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css',
})
export class UserDialogComponent {
  userData!: UserData;
  amount: number | null = null;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialogRef<UserDialogComponent>
  ) {
    this.userData = data.userData;
  }

  public charge(): void {
    this._dialog.close({
      add: true,
      amount: this.amount,
    });
  }

  public closeDialog(): void {
    this._dialog.close({
      add: false,
    });
  }
}
