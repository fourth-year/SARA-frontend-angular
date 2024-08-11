import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicalRecordsService } from '../../../services/medical-records.service';
import { MedicalRecordData } from '../../../interfaces/medical-record/medical-record-data';
import { AnimalsService } from '../../../services/animals.service';
import { AnimalData } from '../../../interfaces/animal/animal-data';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MdicalRecordDialogComponent } from '../mdical-record-dialog/mdical-record-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animal-records',
  templateUrl: './animal-records.component.html',
  styleUrl: './animal-records.component.css',
})
export class AnimalRecordsComponent {
  animalId!: number;
  recordsList!: MedicalRecordData[];
  animalData!: AnimalData;

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _medicalRecordsService: MedicalRecordsService,
    private _animalsService: AnimalsService
  ) {
    this._route.params.subscribe((params) => {
      this.animalId = params['animalId'];
    });
  }

  public ngOnInit(): void {
    this._animalsService.getById(this.animalId).subscribe(
      (response) => {
        console.log(response);
        this.animalData = response.data;
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

    this._medicalRecordsService.getAnimalRecords(this.animalId).subscribe(
      (response) => {
        this.recordsList = response.data as MedicalRecordData[];
        this.recordsList = this.recordsList.reverse();
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

  public openDialog(record: {} | MedicalRecordData): void {
    const dialog = this._dialog.open(MdicalRecordDialogComponent, {
      width: '500px',
      data: {
        data: Object.assign({}, record),
        animalId: this.animalId,
      },
    });

    dialog.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result.event === 'Add') {
          this._medicalRecordsService.addRecord(result.data).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (error) => {
              console.log(error);
              this._snackBar.open(
                'adding record failed! please try again',
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
          this._medicalRecordsService
            .editRecord(result.data.id, result.data)
            .subscribe(
              (response) => {
                this.ngOnInit();
              },
              (error) => {
                console.log(error);
                this._snackBar.open(
                  'updating record failed! please try again',
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

  public onDelete(recordId: number): void {
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
          this._medicalRecordsService.deleteRecord(recordId).subscribe(
            (response) => {
              console.log(response);
              this.ngOnInit();
            },
            (error) => {
              console.log(error);
              this._snackBar.open(
                'deleting record failed! please try again',
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
