import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { PostData } from '../../interfaces/post/post-data';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts!: PostData[];

  constructor(
    private _postService: PostsService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this._postService.getPosts().subscribe(
      (response) => {
        let res = response.data as PostData[];
        this.posts = res.reverse();
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

  public openDialog(post: {} | PostData) {
    const dialog = this._dialog.open(PostDialogComponent, {
      width: '500px',
      data: Object.assign({}, post),
    });

    dialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        if (result.event === 'Add') {
          this._postService.addPost(result.data).subscribe(
            (response) => {
              this.ngOnInit();
              console.log(response);
            },
            (error) => {
              console.log(error);
              this._snackBar.open(
                'adding post failed! please try again',
                'close',
                {
                  panelClass: ['style-error'],
                  horizontalPosition: 'end',
                  verticalPosition: 'bottom',
                }
              );
            }
          );
        } else if (result.event === 'Update') {
          this._postService
            .editPost(result.data.id, {
              text: result.data.text,
            })
            .subscribe(
              (response) => {
                this.ngOnInit();
              },
              (error) => {
                console.log(error);
                this._snackBar.open(
                  'updating post failed! please try again',
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
      }
    });
  }

  public onDelete(postId: number): void {
    this._dialog
      .open(ConfirmDeleteComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to delete this post?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._postService.deletePost(postId).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (error) => {
              console.log(error);
              this._snackBar.open(
                'deleting post failed! please try again',
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

  public showComments(postId: number): void {
    this._dialog.open(CommentsDialogComponent, {
      height: '600px',
      width: '500px',
      data: {
        postId: postId,
      },
    });
  }
}
