import { AfterViewInit, Component, inject, PLATFORM_ID } from '@angular/core';
import { HeroService, IHero } from '../../../shared/services/hero.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AlertService } from '../../../core/services/alert.service';
import { AuthService } from '../../../core/services/auth.service';
import { GoogleAuthService } from '../../../core/services/google-auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  index: number = 0;
  items: IHero[];

  isAnimating: boolean = false;
  direction: 'next' | 'prev' = 'next';
  private platformId = inject(PLATFORM_ID);

  constructor(private _heroService: HeroService,
    private alertService: AlertService,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
    private router: Router
  ) {
    this.items = _heroService.getAllHeroItems();
  }
  next() {
    if (this.index == this.items.length - 1)
      this.index = 0;
    else
      this.index++;

    this.direction = 'next';
    this.animate(() => {
      this.index = (this.index + 1) % this.items.length;
    });
  }
  prev() {
    if (this.index == 0)
      this.index = this.items.length - 1;
    else
      this.index--;

    this.direction = 'prev';
    this.animate(() => {
      this.index =
        (this.index - 1 + this.items.length) % this.items.length;
    });
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }
 
  goToContact(): void {
     this.authService.checkLogin('/Contact');
  }

  private animate(changeIndex: Function) {
    this.isAnimating = true;

    setTimeout(() => {
      changeIndex();
      this.isAnimating = false;
    }, 300);
  }
}
