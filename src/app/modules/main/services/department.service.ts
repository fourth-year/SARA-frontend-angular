import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { DepartmentResponse } from '../interfaces/departments/department-response';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getAllDepartments(): Observable<DepartmentResponse> {
    return this._http.get<DepartmentResponse>(
      this._apiUrl + '/departments/getall'
    );
  }

  public addDepartment(
    depatmentName: string,
    departmentNumber: number
  ): Observable<DepartmentResponse> {
    return this._http.post<DepartmentResponse>(
      this._apiUrl + '/department/add',
      {
        name: depatmentName,
        number: departmentNumber,
      }
    );
  }

  public deleteDepartment(id: number): Observable<DepartmentResponse> {
    return this._http.delete<DepartmentResponse>(
      this._apiUrl + '/department/delete/' + id
    );
  }
}
