import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isLoggedIn()) {

    return true;

  }


  localStorage.setItem(
    'redirectUrl',
    state.url
  );


  authService.checkLogin(state.url);


  return router.createUrlTree(['/Home']);

};