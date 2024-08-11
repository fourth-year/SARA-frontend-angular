import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'department',
})
export class DepartmentPipe implements PipeTransform {
  transform(department: number): string {
    switch (department) {
      case 1:
        return 'Department 1';
      case 2:
        return 'Department 2';
      case 3:
        return 'Department 3';
      case 4:
        return 'Department 4';
      case 5:
        return 'Department 5';
      case 6:
        return 'Department 6';
      case 7:
        return 'Department 7';
      case 8:
        return 'Department 8';
      case 9:
        return 'Department 9';
      case 10:
        return 'Department 10';
      default:
        return 'unknown';
    }
  }
}
