import { Component } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';
import { CompanyServicesService, ICompanyService } from '../../shared/services/company-services.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-company-services',
  imports: [SectionHeaderComponent,TranslatePipe],
  templateUrl: './company-services.component.html',
  styleUrl: './company-services.component.scss'
})
export class CompanyServicesComponent {
  services: ICompanyService[]
  constructor(private _companyService: CompanyServicesService) {
    this.services = this._companyService.getAllServices();
  }

}
