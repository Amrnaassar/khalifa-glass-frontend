import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { GoogleAuthService } from './google-auth.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private googleAuthService: GoogleAuthService,
    private loadingService: LoadingService
  ) {}


  // ============================
  // Login Required
  // ============================

  loginRequired(
    onLogin: (idToken: string) => void
  ): void {

    Swal.fire({

      title: 'Login Required',

      text: 'Please login with Google to continue.',

      icon: 'info',

      iconColor: '#0F5132',

      confirmButtonText: 'Login with Google',

      confirmButtonColor: '#0F5132',

      showCancelButton: true,

      cancelButtonText: 'Cancel',

      customClass: {

        popup: 'glass-alert'

      }

    }).then(async (result) => {

      if (!result.isConfirmed) {

        return;

      }


      // Show your Angular global loader
      this.loadingService.show();


      try {

        // Load Google + initialize it
        await this.googleAuthService.initialize(
          onLogin
        );


        // Open Google account chooser
        const success =
          await this.googleAuthService.openGoogleLogin();


        if (!success) {

          this.error(
            'Google Login Error',
            'Unable to open Google Login. Please try again.'
          );

        }

      } catch (error) {

        console.error(
          'Google Login Error:',
          error
        );


        this.error(
          'Google Login Error',
          'Unable to load Google Login. Please try again.'
        );

      } finally {

        // Google is ready
        this.loadingService.hide();

      }

    });

  }


  // ============================
  // Success
  // ============================

  success(
    title: string,
    text: string
  ) {

    Swal.fire({

      icon: 'success',

      title,

      text,

      confirmButtonText: 'OK',

      confirmButtonColor: '#0F5132'

    });

  }


  // ============================
  // Error
  // ============================

  error(
    title: string,
    text: string
  ) {

    Swal.fire({

      icon: 'error',

      title,

      text,

      confirmButtonText: 'OK',

      confirmButtonColor: '#dc3545'

    });

  }


  // ============================
  // Warning
  // ============================

  warning(
    title: string,
    text: string
  ) {

    Swal.fire({

      icon: 'warning',

      title,

      text,

      confirmButtonText: 'OK',

      confirmButtonColor: '#f59e0b'

    });

  }


  // ============================
  // Info
  // ============================

  info(
    title: string,
    text: string
  ) {

    Swal.fire({

      icon: 'info',

      title,

      text,

      confirmButtonText: 'OK',

      confirmButtonColor: '#198754'

    });

  }


  // ============================
  // Confirm
  // ============================

  confirm(
    title: string,
    text: string
  ) {

    return Swal.fire({

      icon: 'question',

      title,

      text,

      showCancelButton: true,

      confirmButtonColor: '#0F5132',

      cancelButtonColor: '#dc3545',

      confirmButtonText: 'Yes',

      cancelButtonText: 'Cancel'

    });

  }

}