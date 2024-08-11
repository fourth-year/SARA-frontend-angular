import { Component } from '@angular/core';
import { TokenStorageService } from '../../../../core/services/token-storage.service';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(
    private _router: Router,
    private _tokenStorageService: TokenStorageService
  ) {}

  public ngOnInit(): void {
    let role = this._tokenStorageService.getFromLocalStorage('role');

    if (role === '2') {
      this._router.navigate(['/animal']);
    } else if (role === '3') {
      this._router.navigate(['/doctor-appointments']);
    }
  }

  isSideNavCollapsed: boolean = false;
  screenWidth: number = 0;

  public onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
