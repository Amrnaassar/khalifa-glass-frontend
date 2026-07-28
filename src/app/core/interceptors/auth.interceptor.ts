import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const storageService = inject(StorageService);
  const authService = inject(AuthService);


  if (req.url.includes('/refresh-token')) {
    return next(req);
  }


  const token = storageService.getAccessToken();

  let authRequest = req;


  if (token) {

    authRequest = req.clone({

      setHeaders: {
        Authorization: `Bearer ${token}`
      }

    });

  }


  return next(authRequest).pipe(

    catchError(error => {

      if(error.status === 401) {

        return authService.refreshToken()
          .pipe(

            switchMap(response => {

              const newRequest = req.clone({

                setHeaders: {

                  Authorization:
                  `Bearer ${response.accessToken}`

                }

              });

              return next(newRequest);

            })

          );

      }


      return throwError(() => error);

    })

  );

};