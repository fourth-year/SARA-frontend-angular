import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { TokenStorageService } from '../../../../core/services/token-storage.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  role: string | null | undefined;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @HostListener('window: resize', ['$event']) onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  collapsed: boolean = false;
  screenWidth: number = 0;
  navData = navbarData;

  constructor(private _tokenStorageService: TokenStorageService) {}

  public ngOnInit(): void {
    this.role = this._tokenStorageService.getFromLocalStorage('role');
    console.log(this.role)
    this.screenWidth = window.innerWidth;
  }

  public toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}
