import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { LanguageService } from './core/services/language.service';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

function initializeLanguage(languageService: LanguageService) {
  return () => {
    languageService;
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(),withInterceptors([
      authInterceptor,
      loadingInterceptor
    ])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })),
    provideClientHydration(withEventReplay()),

    provideTranslateService({
    fallbackLang: 'en',
    loader: provideTranslateHttpLoader({
      prefix: 'assets/i18n/',
      suffix: '.json'
    })
  })
  
  ]
}; 