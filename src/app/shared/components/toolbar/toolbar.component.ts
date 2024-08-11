import { Component, HostBinding } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CookieStorageService } from '../../../core/services/cookie-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  loggedIn: boolean = false;
  switchTheme = new FormControl(false);

  @HostBinding('class') className = '';
  darkClass = 'theme-dark';
  lightClass = 'theme-light';

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private cookieStorageService: CookieStorageService
  ) {}

  public ngOnInit(): void {
    this.loggedIn = this._authService.isLoggedIn();

    const cookieValue = this.cookieStorageService.getThemeCookie();

    if (cookieValue === 'dark') {
      this.switchTheme.patchValue(true);
    }

    this.switchTheme.valueChanges.subscribe((currentMode) => {
      console.log(currentMode);
      this.className = currentMode ? this.darkClass : this.lightClass;

      if (currentMode) {
        this.cookieStorageService.setThemeCookie('dark');
        document.body.classList.add(this.darkClass);
      } else {
        this.cookieStorageService.setThemeCookie('light');
        document.body.classList.remove(this.darkClass);
        document.body.classList.add(this.lightClass);
      }
    });
  }

  public navigateToUpdateProfile(): void {
    this._router.navigate(['/update-profile']);
  }

  public login(): void {
    this._router.navigate(['/login']);
  }

  public logout(): void {
    this._authService.logout();
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
