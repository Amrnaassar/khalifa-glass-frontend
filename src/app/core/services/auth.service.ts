import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

import { API } from '../constants/api.constants';
import { StorageService } from './storage.service';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';
import { RefreshTokenResponse } from '../models/refresh-response.model';
import { RefreshTokenRequest } from '../models/refresh-request.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private router = inject(Router);
  private alertService = inject(AlertService);

  private userState = new BehaviorSubject<any>(null);

  user$ = this.userState.asObservable();


  // ============================
  // Google Login
  // ============================

  login(idToken: string): Observable<LoginResponse> {

    const body: LoginRequest = {
      idToken
    };

    return this.http
      .post<LoginResponse>(
        API.BASE_API_URL + API.AUTH.LOGIN,
        body
      )
      .pipe(

        tap(response => {

          this.storage.saveTokens(
            response.token,
            response.refreshToken
          );

          this.setCurrentUser(response.token);

        })

      );

  }


  // ============================
  // Refresh Token
  // ============================

  refreshToken(): Observable<RefreshTokenResponse> {

    const refreshToken =
      this.storage.getRefreshToken();

    const body: RefreshTokenRequest = {
      refreshToken
    };

    return this.http
      .post<RefreshTokenResponse>(
        API.BASE_API_URL + API.AUTH.REFRESH_TOKEN,
        body
      )
      .pipe(

        tap(response => {

          this.storage.saveTokens(
            response.accessToken,
            response.refreshToken
          );

          this.setCurrentUser(
            response.accessToken
          );

        })

      );

  }


  // ============================
  // Current User From JWT
  // ============================

  private setCurrentUser(token: string): void {

    if (!token) {
      return;
    }

    const payload = JSON.parse(
      atob(token.split('.')[1])
    );

    this.userState.next({

      id: payload.sub,

      email: payload.email,

      name: payload.name,

      role:
        payload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]

    });

  }


  getCurrentUser() {

    const token = this.storage.getAccessToken();

    if (!token) {
      return null;
    }

    const payload = JSON.parse(
      atob(token.split('.')[1])
    );

    return {

      id: payload.sub,

      email: payload.email,

      name: payload.name,

      role:
        payload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]

    };

  }


  getRole(): string | null {

    const user = this.getCurrentUser();

    return user?.role ?? null;

  }


  isAdmin(): boolean {

    return this.getRole() === 'Admin';

  }


  // ============================
  // Logout
  // ============================

  logout(): void {

    this.storage.clearTokens();

    this.userState.next(null);

    this.router.navigate(['/'])
      .then(() => {

        this.alertService.success(
          'Logged Out Successfully',
          'Thank you for visiting Khalifa Glass.'
        );

      });

  }


  // ============================
  // Check Login
  // ============================

  isLoggedIn(): boolean {

    return this.storage.isLoggedIn();

  }


  // ============================
  // Navigate If Logged
  // ============================

  checkLogin(url: string): void {

    if (this.isLoggedIn()) {

      this.router.navigate([url]);

      return;
    }


    this.storage.setLocalStorge(
      'redirectUrl',
      url
    );


    this.alertService.loginRequired(
      (idToken: string) => {

        this.login(idToken)
          .subscribe({

            next: () => {

              const redirectUrl =
                this.storage.getLocalStorge(
                  'redirectUrl'
                );


              if (redirectUrl) {

                this.storage.removeLocalStorge(
                  'redirectUrl'
                );


                this.router
                  .navigate([redirectUrl])
                  .then(() => {

                    this.alertService.success(
                      'Login Successful',
                      'Welcome back'
                    );

                  });

              }

            },


            error: (err) => {

              console.error(
                'Login failed:',
                err
              );

              this.alertService.error(
                'Login Failed',
                'Something went wrong. Please try again.'
              );

            }

          });

      }
    );

  }


  // ============================
  // Go To Quote
  // ============================

  goToQuote(): void {

    if (!this.isLoggedIn()) {

      this.storage.setLocalStorge(
        'redirectUrl',
        '/get-quote'
      );


      this.alertService.loginRequired(
        (idToken: string) => {

          this.login(idToken)
            .subscribe({

              next: () => {

                const redirectUrl =
                  this.storage.getLocalStorge(
                    'redirectUrl'
                  );


                if (redirectUrl) {

                  this.storage.removeLocalStorge(
                    'redirectUrl'
                  );


                  this.router
                    .navigate([redirectUrl])
                    .then(() => {

                      this.alertService.success(
                        'Login Successful',
                        'Welcome back'
                      );

                    });

                }

              },


              error: (err) => {

                console.error(
                  'Login failed:',
                  err
                );

                this.alertService.error(
                  'Login Failed',
                  'Something went wrong. Please try again.'
                );

              }

            });

        }
      );

      return;
    }


    if (this.isAdmin()) {

      this.router.navigate([
        '/admin/quotes'
      ]);

    } else {

      this.router.navigate([
        '/get-quote'
      ]);

    }

  }

}