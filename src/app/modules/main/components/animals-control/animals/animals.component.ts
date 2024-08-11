import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AnimalDialogComponent } from './animal-dialog/animal-dialog.component';
import { ConfirmDeleteComponent } from '../../../../../shared/components/confirm-delete/confirm-delete.component';
import { AnimalData } from '../../../interfaces/animal/animal-data';
import { AnimalsService } from '../../../services/animals.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css',
})
export class AnimalsComponent {
  @Input() role: string = '';
  displayedColumns: string[] = [
    'name',
    'age',
    'animaltype_id',
    'entry_date',
    'department_id',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _animalService: AnimalsService
  ) {}

  public ngOnInit(): void {
    this._animalService.getAllAnimals().subscribe(
      (response: { data: any[] | undefined }) => {
        this.dataSource = new MatTableDataSource<any>(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
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

  public openDialog(animal: {} | AnimalData): void {
    const dialog = this._dialog.open(AnimalDialogComponent, {
      width: '500px',
      data: Object.assign({}, animal),
    });

    dialog.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result != undefined) {
        if (result.event === 'Add') {
          this._animalService.addAnimal(result.data).subscribe(
            (response: any) => {
              this.ngOnInit();
              console.log('added', response);
            },
            (error: any) => {
              console.log(error);
              this._snackBar.open('adding animal failed! please try again', 'close', {
                panelClass: ['style-error'],
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
              });
            }
          );
        } else if (result.event === 'Update') {
          this._animalService.editAnimal(result.data.id, result.data).subscribe(
            (response: any) => {
              this.ngOnInit();
              console.log(response);
            },
            (error: any) => {
              console.log(error);
              this._snackBar.open('updating animal failed! please try again', 'close', {
                panelClass: ['style-error'],
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
              });
            }
          );
        }
      }
    });
  }

  public showMedicalRecords(animalId: number): void {
    this._router.navigate(['/medical-records', animalId]);
  }

  public onDelete(animalId: number): void {
    this._dialog
      .open(ConfirmDeleteComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to delete this animal?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._animalService.deleteAnimal(animalId).subscribe(
            (response: any) => {
              this.ngOnInit();
            },
            (error: any) => {
              this._snackBar.open('deleting animal failed! please try again', 'close', {
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
