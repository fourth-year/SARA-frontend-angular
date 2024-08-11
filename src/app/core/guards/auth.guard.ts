import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const loggedIn = inject(AuthService).isLoggedIn();

  if (loggedIn) {
    return loggedIn;
  } else {
    const router: Router = inject(Router);
    router.navigate(['/auth/login']);
    return loggedIn;
  }
};
