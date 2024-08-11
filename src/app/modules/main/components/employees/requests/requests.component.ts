import { Component } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import { EmployeesData } from '../../../interfaces/employees/employees-data';
import { ConfirmActionComponent } from '../../../../../shared/components/confirm-action/confirm-action.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent {
  requestList!: EmployeesData[];
  selectedRequest: EmployeesData | null = null;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _employeesService: EmployeesService
  ) {}

  public ngOnInit(): void {
    this._employeesService.getAllEmployeeRequest().subscribe(
      (response) => {
        this.requestList = response.data.reverse();
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

  public showDetails(request: EmployeesData): void {
    this.selectedRequest = request;
  }

  public acceptReq(): void {
    this._dialog
      .open(ConfirmActionComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to approve on this request?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._employeesService
            .acceptReq(this.selectedRequest!.user_id)
            .subscribe(
              (response) => {
                this.selectedRequest = null;
                this.ngOnInit();
              },
              (error) => {
                console.log(error);
                this._snackBar.open(
                  'approving on employee request failed! please try again',
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
