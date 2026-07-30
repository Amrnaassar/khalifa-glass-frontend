import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CompanyServicesComponent } from './pages/company-services/company-services.component';
import { OurProjectsComponent } from './pages/our-projects/our-projects.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FAQComponent } from './pages/faq/faq.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { GetQuoteComponent } from './pages/get-quote/get-quote.component';
import { adminGuard } from './core/guards/admin.guard';
import { AdminQuotesComponent } from './pages/admin-quotes/admin-quotes.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: "", redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'About-Us', component: AboutUsComponent },
    { path: 'Services', component: CompanyServicesComponent },
    { path: 'Projects', component: OurProjectsComponent },
    { path: 'Gallery', component: GalleryComponent },
    { path: 'FAQ', component: FAQComponent },
    { path: 'Contact', component: ContactComponent,
      canActivate: [authGuard]},
    { path: 'Get-Quote', component: GetQuoteComponent,
      canActivate: [authGuard]},
    { path: 'Terms-conditions', component: TermsConditionsComponent },
    { path: 'Privacy-policy', component: PrivacyPolicyComponent },
    { path: 'admin/quotes', component: AdminQuotesComponent,
      canActivate: [adminGuard,authGuard] },
    { path: '**', component: NotFoundComponent },

];
