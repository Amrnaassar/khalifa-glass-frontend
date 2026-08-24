import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { CompanyServicesService, ICompanyService } from '../../shared/services/company-services.service';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  services: ICompanyService[];
  constructor(private authService: AuthService, companyService: CompanyServicesService) {
    this.services = companyService.getAllServices();
  }
  goToContact() {
    this.authService.checkLogin('/contact');
  }
}
