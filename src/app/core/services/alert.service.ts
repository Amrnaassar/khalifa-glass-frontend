import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { GoogleAuthService } from './google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(private googleAuthService:GoogleAuthService){}
  
    loginRequired(): void {
  
      Swal.fire({
  
        title: 'Login Required',
  
        text: 'Please login with Google to continue.',
  
        icon: 'info',
  
        confirmButtonText: 'Login with Google',
  
        confirmButtonColor: '#0F5132',
  
  
        showCancelButton: true,
  
        cancelButtonText: 'Cancel',
  
        customClass: {
  
          popup: 'glass-alert'
  
        }
  
      }).then((result) => {
  
  
        if (result.isConfirmed) {
  
  
          this.googleAuthService.openGoogleLogin();
  
        }
  
  
      });
  
    }

  success(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: 'OK',
      confirmButtonColor: '#0F5132'
    });
  }

  error(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'OK',
      confirmButtonColor: '#dc3545'
    });
  }

  warning(title: string, text: string) {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'OK',
      confirmButtonColor: '#f59e0b'
    });
  }

  info(title: string, text: string) {
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText: 'OK',
      confirmButtonColor: '#198754'
    });
  }

  confirm(title: string, text: string) {
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