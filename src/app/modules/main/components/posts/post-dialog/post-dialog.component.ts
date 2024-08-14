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
    if (files.length > 0) {
      let file = files[0];
      let reader = new FileReader();
  
      // Read the file as a DataURL (base64 string)
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        // Get the base64 string without the prefix
        const base64String = (reader.result as string).split(',')[1];  
  
        // Update form control with the base64 string
        this.postForm.controls['photo'].patchValue(base64String);
  
        // For preview purposes, use the full base64 string with the prefix
        this.file = base64String as string;  // This includes 'data:image/jpeg;base64,...'
  
        // Reset the input file field if needed
        this.resetInput();
      };
    }
  }
  
  public resetInput(): void {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
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
    console.log(this.file)

    this._dialog.close(null);
  }
}
