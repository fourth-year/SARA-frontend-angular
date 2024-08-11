import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'animalType',
})
export class AnimalTypePipe implements PipeTransform {
  transform(type: number): string {
    switch (type) {
      case 1:
        return 'Cat';
      case 2:
        return 'Dog';
      case 3:
        return 'Bird';
      case 4:
        return 'Horse';
      // case 5:
      //   return 'Donkey';
      default:
        return 'unknown';
    }
  }
}
