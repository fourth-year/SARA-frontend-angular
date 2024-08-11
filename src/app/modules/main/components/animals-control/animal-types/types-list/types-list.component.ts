import { Component } from '@angular/core';
import { AnimalTypeService } from '../../../../services/animal-type.service';
import { AnimalTypeDate } from '../../../../interfaces/animal-type/animal-type-data';
import { ConfirmDeleteComponent } from '../../../../../../shared/components/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrl: './types-list.component.css',
})
export class TypesListComponent {
  types!: AnimalTypeDate[];

  constructor(
    private _animalTypeService: AnimalTypeService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,

  ) {}

  public ngOnInit(): void {
    this._animalTypeService.getAllAnimalsTypes().subscribe(
      (response) => {
        this.types = response.data;
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

  public onDelete(id: number): void {
    this._dialog
      .open(ConfirmDeleteComponent, {
        height: '150px',
        width: '350px',
        data: {
          text: 'Are you sure you want to delete this type?',
        },
      })
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this._animalTypeService.deleteAnimalType(id).subscribe(
            (response) => {
              this.ngOnInit();
            },
            (error) => {
              console.log(error);
              this._snackBar.open('delete failed! please try again', 'close', {
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
