import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeesResponse } from '../interfaces/employees/employees-response';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getAllEmployees(): Observable<EmployeesResponse> {
    return this._http.get<EmployeesResponse>(
      this._apiUrl + '/user/employees_requests/getall?is_verified=1'
    );
  }

  public getAllEmployeeRequest(): Observable<EmployeesResponse> {
    return this._http.get<EmployeesResponse>(
      this._apiUrl + '/user/employees_requests/getall?is_verified=0'
    );
  }

  public acceptReq(user_id: number): Observable<any> {
    return this._http.put<any>(
      this._apiUrl + '/user/approvereq/' + user_id,
      {}
    );
  }

  public deleteEmployee(empId: number): Observable<EmployeesResponse> {
    return this._http.delete<EmployeesResponse>(
      this._apiUrl + '/user/employee/delete/' + empId
    );
  }

  public changeRole(userId: number, newRole: number): Observable<any> {
    return this._http.post<any>(this._apiUrl + '/user/change-role/' + userId, {
      new_role: newRole,
    });
  }
}
