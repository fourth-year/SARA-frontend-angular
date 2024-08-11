import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserData } from '../../interfaces/user/user-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'wallet', 'actions'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _usersService: UsersService
  ) {}

  public ngOnInit(): void {
    this._usersService.getAllUsers().subscribe(
      (response) => {
        this.dataSource.data = response.data.filter((e) => e.role === '1');
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public chargeWallet(user: UserData): void {
    this._dialog
      .open(UserDialogComponent, {
        width: '500px',
        data: {
          userData: user,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.add) {
          this._usersService.chargeWallet(user.id, res.amount).subscribe(
            (response) => {
              console.log('success');
              this.ngOnInit();
            },
            (error) => {
              console.log(error);
              this._snackBar.open(
                'charging wallet failed! please try again',
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
