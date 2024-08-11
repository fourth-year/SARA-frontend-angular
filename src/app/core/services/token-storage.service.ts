import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public logout(): void {
    localStorage.clear();
  }

  public saveToLocalStorage(name: string, value: string): void {
    localStorage.setItem(name, value);
  }

  public getFromLocalStorage(name: string): string | null {
    return localStorage.getItem(name);
  }
}
