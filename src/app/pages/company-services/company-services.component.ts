import { Component, OnInit } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { CompanyServicesService, ICompanyService } from '../../shared/services/company-services.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-company-services',
  imports: [SectionHeaderComponent, TranslatePipe],
  templateUrl: './company-services.component.html',
  styleUrl: './company-services.component.scss'
})
export class CompanyServicesComponent implements OnInit {

  

  services: ICompanyService[]
  constructor(private _companyService: CompanyServicesService,private seoService :SeoService) {
    this.services = this._companyService.getAllServices();
  }

  ngOnInit(): void {
    this.seoService.updateSeo('services');
  }

  visibleServices = 8;

  get displayedServices() {
    return this.services.slice(0, this.visibleServices);
  }

  get hasMoreServices(): boolean {
    return this.visibleServices < this.services.length;
  }

  showAllServices(): void {
    this.visibleServices = this.services.length;
  }

}
