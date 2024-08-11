import { Component, ViewChild } from '@angular/core';
import { AnimalTypeService } from '../../../services/animal-type.service';
import { AnimalTypeDate } from '../../../interfaces/animal-type/animal-type-data';
import { TypesListComponent } from './types-list/types-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-animal-types',
  templateUrl: './animal-types.component.html',
  styleUrl: './animal-types.component.css',
})
export class AnimalTypesComponent {
  newType: string = '';

  @ViewChild('typeList') typeListComponent!: TypesListComponent;

  constructor(
    private _animalTypeService: AnimalTypeService,
    private _snackBar: MatSnackBar
  ) {}

  public addAnimalType(): void {
    if (this.newType != '') {
      this._animalTypeService.addAnimalType(this.newType).subscribe(
        (response) => {
          this.typeListComponent.ngOnInit();
          this.newType = '';
        },
        (error) => {
          console.log(error);
          this._snackBar.open('adding failed! please try again', 'close', {
            panelClass: ['style-error'],
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }

  public clear(): void {
    this.newType = '';
  }
}
