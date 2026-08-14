import {
  Injectable,
  NgZone,
  PLATFORM_ID,
  inject
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  private initialized = false;

  private googleReadyPromise: Promise<void> | null = null;


  // ============================
  // Load Google Identity Services
  // ============================

  private loadGoogleScript(): Promise<void> {

    if (!isPlatformBrowser(this.platformId)) {

      return Promise.reject(
        new Error(
          'Google Login is only available in browser'
        )
      );

    }


    if (
      typeof google !== 'undefined' &&
      google.accounts?.id
    ) {

      return Promise.resolve();

    }


    if (this.googleReadyPromise) {

      return this.googleReadyPromise;

    }


    this.googleReadyPromise =
      new Promise<void>((resolve, reject) => {

        const existingScript =
          document.querySelector(
            'script[src="https://accounts.google.com/gsi/client"]'
          );


        if (existingScript) {

          const checkGoogle = () => {

            if (
              typeof google !== 'undefined' &&
              google.accounts?.id
            ) {

              resolve();

            } else {

              setTimeout(
                checkGoogle,
                100
              );

            }

          };

          checkGoogle();

          return;
        }


        const script =
          document.createElement('script');

        script.src =
          'https://accounts.google.com/gsi/client';

        script.async = true;

        script.defer = true;


        script.onload = () => {

          if (
            typeof google !== 'undefined' &&
            google.accounts?.id
          ) {

            resolve();

          } else {

            reject(
              new Error(
                'Google Identity Services loaded but google.accounts.id is unavailable'
              )
            );

          }

        };


        script.onerror = () => {

          reject(
            new Error(
              'Failed to load Google Identity Services'
            )
          );

        };


        document.head.appendChild(script);

      });


    return this.googleReadyPromise;

  }


  // ============================
  // Initialize Google
  // ============================

  async initialize(
    callback: (token: string) => void
  ): Promise<void> {

    await this.loadGoogleScript();


    if (this.initialized) {

      return;

    }


    google.accounts.id.initialize({

      client_id: environment.clientIdGoogle,

      callback: (response: any) => {

        this.ngZone.run(() => {

          if (response?.credential) {

            callback(
              response.credential
            );

          }

        });

      }

    });


    this.initialized = true;

  }


  // ============================
  // Open Google Login
  // ============================

  async openGoogleLogin(): Promise<boolean> {

    try {

      await this.loadGoogleScript();


      if (!this.initialized) {

        console.warn(
          'Google Auth has not been initialized.'
        );

        return false;

      }


      google.accounts.id.prompt(
        (notification: any) => {

          if (
            notification?.isNotDisplayed?.()
          ) {

            console.warn(
              'Google One Tap was not displayed.'
            );

          }

          if (
            notification?.isSkippedMoment?.()
          ) {

            console.warn(
              'Google One Tap was skipped.'
            );

          }

        }
      );


      return true;

    } catch (error) {

      console.error(
        'Google Login failed:',
        error
      );

      return false;

    }

  }


  // ============================
  // Render Google Button
  // ============================

  async renderButton(
    element: HTMLElement
  ): Promise<void> {

    try {

      await this.loadGoogleScript();


      if (!this.initialized) {

        return;

      }


      google.accounts.id.renderButton(

        element,

        {
          theme: 'outline',
          size: 'large',
          width: 300
        }

      );

    } catch (error) {

      console.error(
        'Google button rendering failed:',
        error
      );

    }

  }

}