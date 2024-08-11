import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostData } from '../../../interfaces/post/post-data';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.css',
})
export class PostDialogComponent {
  action: string = '';
  postForm = this._formBuilder.group({
    id: [0],
    user_id: [1],
    text: ['', [Validators.required]],
    photo: [''],
  });
  file: string = '';
  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialogRef<PostDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: PostData
  ) {
    this.postForm.patchValue(data);
  }

  public ngOnInit(): void {
    this.action =
      this.postForm.get('id'.toString())?.value > 0 ? 'Update' : 'Add';
    this.file = this.data.photo;
  }

  public onFileChange(event: any): void {
    const files = event.target.files as FileList;
    // convert the image file to base64
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.postForm.controls['photo'].patchValue(reader.result as string);
    };

    //////////////////////////////////// end
    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.resetInput();
    }
  }

  public resetInput(): void {
    const input = document.getElementById(
      'avatar-input-file'
    ) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  public doAction(): void {
    this._dialog.close({
      data: this.postForm.value,
      event: this.postForm.get('id'.toString())?.value > 0 ? 'Update' : 'Add',
    });
  }

  public closeDialog(): void {
    this._dialog.close(null);
  }
}
