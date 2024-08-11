import { Component, Inject, Optional } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrl: './comments-dialog.component.css',
})
export class CommentsDialogComponent {
  postId!: number;
  loaded = false;

  comments!: any[];

  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialogRef<CommentsDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _postsService: PostsService
  ) {
    this.postId = data.postId;
  }

  public ngOnInit(): void {
    console.log('ds');
    this._postsService.GetPostComments(this.postId).subscribe(
      (response) => {
        this.loaded = true;
        this.comments = response.data;
      },
      (error) => {
        this._snackBar.open('something went wrong! please refresh', 'close', {
          panelClass: ['style-error'],
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
