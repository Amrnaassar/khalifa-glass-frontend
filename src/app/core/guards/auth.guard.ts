import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../services/storage.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const storage = inject(StorageService);


  if (authService.isLoggedIn()) {

    return true;

  }

  storage.setLocalStorge(
    'redirectUrl',
    state.url
  );


  authService.checkLogin(state.url);


  return router.createUrlTree(['/']);

};