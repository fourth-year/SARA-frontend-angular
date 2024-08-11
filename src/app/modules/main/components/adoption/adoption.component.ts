import { Component, signal, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdoptionService } from '../../services/adoption.service';
import { AdoptionData } from '../../interfaces/adoption/adoption-data';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../../../../shared/components/confirm-action/confirm-action.component';
import { SponcershipService } from '../../services/sponcership.service';
import { SponcershipData } from '../../interfaces/sponcership/sponcership-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrl: './adoption.component.css',
})
export class AdoptionComponent {
  pendingAdoptionDisplayedColumns: string[] = [
    'date',
    'name',
    'email',
    'phone',
    'animal_name',
    'animal_type',
    'animal_department',
    'actions',
  ];

  acceptedAdoptionDisplayedColumns: string[] = [
    'date',
    'name',
    'email',
    'phone',
    'animal_name',
    'animal_type',
    'animal_department',
  ];

  pendingSponcershipDisplayedColumns: string[] = [
    'date',
    'name',
    'email',
    'phone',
    'animal_name',
    'animal_type',
    'animal_department',
    'actions',
  ];

  acceptedSponcershipDisplayedColumns: string[] = [
    'date',
    'name',
    'email',
    'phone',
    'animal_name',
    'animal_type',
    'animal_department',
  ];

  pendingAdoptionDataSource = new MatTableDataSource<any>();
  acceptedAdoptionDataSource = new MatTableDataSource<any>();
  pendingSponcershipDataSource = new MatTableDataSource<any>();
  acceptedSponcershipDataSource = new MatTableDataSource<any>();

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _adoptionService: AdoptionService,
    private _sponcershipService: SponcershipService
  ) {}

  public ngOnInit(): void {
    this._adoptionService.getAllPendingAdoption().subscribe(
      (response) => {
        this.pendingAdoptionDataSource = new MatTableDataSource<any>(
          response.data as AdoptionData[]
        );
      },
      (error) => {
        console.log(error);

        this._snackBar.open('loading failed! please refresh', 'close', {
          panelClass: ['style-error'],
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );

    this._adoptionService.getAllAcceptedAdoption().subscribe(
      (response) => {
        this.acceptedAdoptionDataSource = new MatTableDataSource<any>(
          response.data as AdoptionData[]
        );
      },
      (error) => {
        console.log(error);

        this._snackBar.open('loading failed! please refresh', 'close', {
          panelClass: ['style-error'],
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );

    this._sponcershipService.getAllPendingSponcership().subscribe(
      (response) => {
        this.pendingSponcershipDataSource = new MatTableDataSource<any>(
          response.data as SponcershipData[]
        );
      },
      (error) => {
        console.log(error);

        this._snackBar.open('loading failed! please refresh', 'close', {
          panelClass: ['style-error'],
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );

    this._sponcershipService.getAllAcceptedSponcership().subscribe(
      (response) => {
        this.acceptedSponcershipDataSource = new MatTableDataSource<any>(
          response.data as SponcershipData[]
        );
      },
      (error) => {
        console.log(error);

        this._snackBar.open('loading failed! please refresh', 'close', {
          panelClass: ['style-error'],
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  public approved(adop_id: any): void {
    this._dialog
      .open(ConfirmActionComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to approve on this adoption?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._adoptionService.approveReq(adop_id).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (error) => {
              console.log(error);

              this._snackBar.open('approving the adoption request failed! Please try again', 'close', {
                panelClass: ['style-error'],
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
              });
            }
          );
        }
      });
  }

  public approvedSpon(spon_id: any): void {
    this._dialog
      .open(ConfirmActionComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to approve on this adoption?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._sponcershipService.approveReq(spon_id).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (error) => {
              console.log(error);
              
              this._snackBar.open('approving the sponcership request failed! Please try again', 'close', {
                panelClass: ['style-error'],
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
              });
            }
          );
        }
      });
  }
}
