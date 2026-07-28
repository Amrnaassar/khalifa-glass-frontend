import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutUsSectionComponent } from './about-us-section/about-us-section.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { OurProjectsSectionComponent } from './our-projects-section/our-projects-section.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [HeroComponent,StatisticsComponent,AboutUsSectionComponent,ServicesSectionComponent,OurProjectsSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private seoService = inject(SeoService);
  ngOnInit(): void {
    this.seoService.updateSeo('home');

  }

}
