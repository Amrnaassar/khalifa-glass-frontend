import {
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
export class AppComponent implements OnInit {

  title = 'Khalifa Glass';

  private lang = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);
  private authService = inject(AuthService);
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
          .subscribe({

            error: () => {

              this.storage.clearTokens();

            }

          });

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


 

}