import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css',
})
export class ConfirmDeleteComponent {
  text: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any) {
    this.text = _data.text;
  }
}
