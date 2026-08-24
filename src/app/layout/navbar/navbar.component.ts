import {  Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  readonly languageService = inject(LanguageService);
  
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }


  goToQuote(): void {
    this.authService.goToQuote();
  }
  
  goToContact():void{
        this.authService.checkLogin('/contact');
  }

  logged() {
    if (this.isLogged()) {
      this.authService.logout();
      this.router.navigate(['/']);
    }

    else
      this.authService.checkLogin('/');

  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  isScrolled = false;
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
