import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

import { API } from '../constants/api.constants';
import { StorageService } from './storage.service';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';
import { RefreshTokenResponse } from '../models/refresh-response.model';
import { RefreshTokenRequest } from '../models/refresh-request.model';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private http = inject(HttpClient);

  private storage = inject(StorageService);

  private router= inject(Router);

  private alertService =inject(AlertService);
  
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
        API.BASE_URL + API.AUTH.LOGIN,
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
        API.BASE_URL + API.AUTH.REFRESH_TOKEN,
        body
      )
      .pipe(

        tap(response => {

          this.storage.saveTokens(
            response.accessToken,
            response.refreshToken
          );

        })

      );

  }



  // ============================
  // Current User From JWT
  // ============================

  private setCurrentUser(token: string): void {


    const payload = JSON.parse(
      atob(token.split('.')[1])
    );


    this.userState.next({

      id: payload.sub,

      email: payload.email,

      name: payload.unique_name

    });


  }



  // ============================
  // Logout
  // ============================

  logout(): void {

  this.storage.clearTokens();

  this.userState.next(null);

  this.router.navigate(['/Home'])
    .then(()=>{

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

goIfLogged(url: string): void {

  if (this.isLoggedIn()) {

    this.router.navigate([url]);

  } else {

    localStorage.setItem('redirectUrl', url);

    this.alertService.loginRequired();

  }

}

}