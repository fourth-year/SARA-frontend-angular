import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private _content = new BehaviorSubject<string>('');
  public share = this._content.asObservable();

  constructor() {}

  public updateData(message: string) {
    this._content.next(message);
  }
}
