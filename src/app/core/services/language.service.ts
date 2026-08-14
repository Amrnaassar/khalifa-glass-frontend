import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private translate = inject(TranslateService);
  private storage = inject(StorageService);

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  readonly currentLanguage = signal<'en' | 'ar'>('en');

  constructor() {
    this.initialize();
  }

  private initialize(): void {

    let lang: 'en' | 'ar' = 'en';

    if (isPlatformBrowser(this.platformId)) {
      const saved = this.storage.getLocalStorge('language') as 'en' | 'ar' | null;

      if (saved) {
        lang = saved;
      } else {
        const browserLang = this.translate.getBrowserLang();
        lang = browserLang === 'ar' ? 'ar' : 'en';
      }
    }

    this.setLanguage(lang);
  }

  setLanguage(lang: 'en' | 'ar'): void {

    this.translate.use(lang);

    this.currentLanguage.set(lang);

    if (isPlatformBrowser(this.platformId)) {

      // تغيير الاتجاه
      this.document.documentElement.setAttribute('lang', lang);
      this.document.documentElement.setAttribute(
        'dir',
        lang === 'ar' ? 'rtl' : 'ltr'
      );

      // اجبار المتصفح يعيد حساب الـ layout
      setTimeout(() => {
        this.document.body.style.direction =
          lang === 'ar' ? 'rtl' : 'ltr';
      });

      if (lang === 'ar') {
        this.document.body.classList.add('arabic');
      } else {
        this.document.body.classList.remove('arabic');
      }

      this.storage.setLocalStorge('language', lang);
    }
  }

  toggleLanguage(): void {
    this.setLanguage(
      this.currentLanguage() === 'ar'
        ? 'en'
        : 'ar'
    );
  }

  isArabic(): boolean {
    return this.currentLanguage() === 'ar';
  }
}