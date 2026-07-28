import { Injectable, NgZone, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoadingService } from './loading.service';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {


  private ngZone = inject(NgZone);

  initialized: boolean = false; 


  initialize(
    callback: (token: string) => void
  ): void {
    if (this.initialized) {
      return;
    }
     this.initialized = true;
    google.accounts.id.initialize({

      
      client_id: environment.clientIdGoogle,

      callback: (response: any) => {

        this.ngZone.run(() => {

          callback(response.credential);

        });
      }

    });


  }



  renderButton(element: HTMLElement): void {


    google.accounts.id.renderButton(

      element,

      {
        theme: 'outline',
        size: 'large',
        width: 300
      }

    );


  }



  // تشغيل Google Login من الـ Alert

  openGoogleLogin(): void {

    google.accounts.id.prompt();


  }


}