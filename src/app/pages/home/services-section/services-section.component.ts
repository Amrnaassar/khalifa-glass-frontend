import { Component } from '@angular/core';
// /import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';
import { CompanyServicesService, ICompanyService } from '../../../shared/services/company-services.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-services-section',
  standalone:true,
  imports: [SectionHeaderComponent, RouterLink, RouterLinkActive,TranslatePipe],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {
  services:ICompanyService[]
  constructor(private _companyService:CompanyServicesService){
    this.services=this._companyService.getAllServices();

  }

}
