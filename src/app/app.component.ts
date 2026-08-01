import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import {
  Router,
  RouterOutlet
} from '@angular/router';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FloatingButtonsComponent } from './layout/floating-buttons/floating-buttons.component';

import { LanguageService } from './core/services/language.service';
import { isPlatformBrowser } from '@angular/common';

import { GoogleAuthService } from './core/services/google-auth.service';
import { AuthService } from './core/services/auth.service';
import { AlertService } from './core/services/alert.service';

import { LoadingComponent } from './shared/components/loading/loading.component';
import { StorageService } from './core/services/storage.service';


@Component({
  selector: 'app-root',
  imports: [
    FooterComponent,
    RouterOutlet,
    FloatingButtonsComponent,
    LoadingComponent,
    NavbarComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'Khalifa Glass';

  private lang = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  private googleAuthService = inject(GoogleAuthService);
  private alertService = inject(AlertService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private storage = inject(StorageService);

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {


      const refreshToken =
        this.storage.getRefreshToken();


      if (
        refreshToken &&
        this.storage.isTokenExpired()
      ) {

        this.authService
          .refreshToken()
          .subscribe();

      }


      if (this.lang.isArabic()) {

        document.body.classList.add('arabic');
        document.body.setAttribute('dir', 'rtl');

      } else {

        document.body.classList.remove('arabic');
        document.body.setAttribute('dir', 'ltr');

      }

    }

  }


  ngAfterViewInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      this.googleAuthService.initialize(
        (idToken: string) => {

          this.authService.login(idToken)
            .subscribe({

              next: () => {

                const redirectUrl = localStorage.getItem('redirectUrl');

                if (redirectUrl) {

                  localStorage.removeItem('redirectUrl');

                  this.router.navigate([redirectUrl])
                    .then(() => {

                      this.alertService.success(
                        'Login Successful',
                        'Welcome back'
                      );

                    });

                }

              },


              error: (err) => {

                this.alertService.error(
                  'Login Failed',
                  'Something went wrong. Please try again.'
                );

                console.log(err);

              }

            });

        }
      );

    }

  }

}