import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrl: './confirm-action.component.css',
})
export class ConfirmActionComponent {
  text: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any) {
    this.text = _data.text;
  }
}
