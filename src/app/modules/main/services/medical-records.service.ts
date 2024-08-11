import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalRecordResponse } from '../interfaces/medical-record/medical-record-response';
import { MedicalRecordData } from '../interfaces/medical-record/medical-record-data';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordsService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getAnimalRecords(animalId: number): Observable<MedicalRecordResponse> {
    return this._http.get<MedicalRecordResponse>(
      this._apiUrl + '/user/animals/medical-records/get/' + animalId
    );
  }

  public deleteRecord(recordId: number): Observable<MedicalRecordResponse> {
    return this._http.delete<MedicalRecordResponse>(
      this._apiUrl + '/user/doctor/medical-record/delete/' + recordId
    );
  }

  public addRecord(
    record: MedicalRecordData
  ): Observable<MedicalRecordResponse> {
    return this._http.post<MedicalRecordResponse>(
      this._apiUrl + '/user/doctor/medical-record/add',
      record
    );
  }

  public editRecord(
    recordId: number,
    newRecord: MedicalRecordData
  ): Observable<MedicalRecordResponse> {
    return this._http.post<MedicalRecordResponse>(
      this._apiUrl + '/user/doctor/medical-record/update/' + recordId,
      newRecord
    );
  }
}
