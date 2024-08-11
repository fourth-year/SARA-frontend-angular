import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AnimalTypeResponse } from '../interfaces/animal-type/animal-type-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalTypeService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getAllAnimalsTypes(): Observable<AnimalTypeResponse> {
    return this._http.get<AnimalTypeResponse>(
      this._apiUrl + '/animaltypes/getall'
    );
  }

  public addAnimalType(typeName: string): Observable<AnimalTypeResponse> {
    return this._http.post<AnimalTypeResponse>(
      this._apiUrl + '/animaltype/add',
      { type: typeName }
    );
  }

  public deleteAnimalType(typeId: number): Observable<AnimalTypeResponse> {
    return this._http.delete<AnimalTypeResponse>(
      this._apiUrl + '/animaltype/delete/' + typeId
    );
  }
}
