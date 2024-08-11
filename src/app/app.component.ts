import { Component } from '@angular/core';
import { CookieStorageService } from './core/services/cookie-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SARA';

  darkClass = 'theme-dark';
  lightClass = 'theme-light';

  constructor(private cookieStorageService: CookieStorageService) {}

  public ngOnInit(): void {
    const cookieValue = this.cookieStorageService.getThemeCookie();
    if (cookieValue === 'dark') {
      document.body.classList.add(this.darkClass);
    } else {
      document.body.classList.remove(this.darkClass);
      document.body.classList.add(this.lightClass);
    }
  }
}
