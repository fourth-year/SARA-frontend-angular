import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalResponse } from '../interfaces/animal/animal-response';
import { environment } from '../../../../environments/environment.development';
import { AnimalData } from '../interfaces/animal/animal-data';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  private _apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public getAllAnimals(): Observable<any> {
    return this._http.get<any>(this._apiUrl + '/animals/getall');
  }

  public getById(animalId: number): Observable<any> {
    return this._http.get<any>(this._apiUrl + '/animal/get/' + animalId);
  }

  public addAnimal(animal: any): Observable<AnimalResponse> {
    return this._http.post<AnimalResponse>(
      this._apiUrl + '/animal/add',
      animal
    );
  }

  public editAnimal(
    animalId: number,
    animal: AnimalData
  ): Observable<AnimalResponse> {
    return this._http.post<AnimalResponse>(
      this._apiUrl + '/animal/update/' + animalId,
      animal
    );
  }

  public deleteAnimal(animalId: number): Observable<AnimalResponse> {
    return this._http.delete<AnimalResponse>(
      this._apiUrl + '/animal/delete/' + animalId
    );
  }
}
