import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly platformId = inject(PLATFORM_ID);

  private readonly ACCESS_TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // ===============================
  // Save Tokens
  // ===============================

  saveTokens(accessToken: string, refreshToken: string): void {

    if (!this.isBrowser) return;

    this.setCookie(
      this.ACCESS_TOKEN_KEY,
      accessToken,
      1 / 24 // ساعة
    );

    this.setCookie(
      this.REFRESH_TOKEN_KEY,
      refreshToken,
      30 // 30 يوم
    );
  }

  // ===============================
  // Access Token
  // ===============================

  getAccessToken(): string {

    if (!this.isBrowser) return '';

    return this.getCookie(this.ACCESS_TOKEN_KEY);
  }

  // ===============================
  // Refresh Token
  // ===============================

  getRefreshToken(): string {

    if (!this.isBrowser) return '';

    return this.getCookie(this.REFRESH_TOKEN_KEY);
  }

  // ===============================
  // Remove Tokens
  // ===============================

  clearTokens(): void {

    if (!this.isBrowser) return;

    this.deleteCookie(this.ACCESS_TOKEN_KEY);
    this.deleteCookie(this.REFRESH_TOKEN_KEY);
  }

  // ===============================
  // Login Check
  // ===============================

  isLoggedIn(): boolean {

  if (!this.isBrowser) return false;


  const token = this.getAccessToken();


  if (!token) {
    return false;
  }


  try {

    const payload = JSON.parse(
      atob(token.split('.')[1])
    );


    const expiry = payload.exp * 1000;


    return Date.now() < expiry;


  } catch {

    return false;

  }

}

isTokenExpired(): boolean {

  const token = this.getAccessToken();


  if(!token){
    return true;
  }


  try {

    const payload = JSON.parse(
      atob(token.split('.')[1])
    );


    const expiry = payload.exp * 1000;


    return Date.now() >= expiry;


  } catch {

    return true;

  }

}

  // ===============================
  // Cookie Helpers
  // ===============================

  private setCookie(
    name: string,
    value: string,
    days: number
  ): void {

    const expires = new Date();

    expires.setTime(
      expires.getTime() + days * 24 * 60 * 60 * 1000
    );

    document.cookie =
      `${name}=${encodeURIComponent(value)};` +
      `expires=${expires.toUTCString()};` +
      `path=/;` +
      `SameSite=Lax`;
  }

  private getCookie(name: string): string {

    const cookieName = `${name}=`;

    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {

      cookie = cookie.trim();

      if (cookie.startsWith(cookieName)) {

        return decodeURIComponent(
          cookie.substring(cookieName.length)
        );

      }
    }

    return '';
  }

  private deleteCookie(name: string): void {

    document.cookie =
      `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  }

}