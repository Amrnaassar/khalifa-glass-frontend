import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SeoService } from '../../core/services/seo.service';
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'

})
export class AboutUsComponent implements OnInit {
  features = [
    'about.features.expertTeam',
    'about.features.highQualityMaterials',
    'about.features.modernTechnology',
    'about.features.customerSatisfaction',
    'about.features.competitivePrices',
    'about.features.onTimeDelivery',
    'about.features.customDesign',
    'about.features.afterSalesSupport'
  ];


  private seoService = inject(SeoService);

  visibleFeatures = 4;


  ngOnInit(): void {
    this.seoService.updateSeo('about');
  }

  get displayedFeatures() {
    return this.features.slice(0, this.visibleFeatures);
  }

  get hasMoreFeatures(): boolean {
    return this.visibleFeatures < this.features.length;
  }

  loadMoreFeatures(): void {
    this.visibleFeatures += 4;
  }
}
