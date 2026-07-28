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

export const routes: Routes = [
    { path: "", redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'About-Us', component: AboutUsComponent },
    { path: 'Services', component: CompanyServicesComponent },
    { path: 'Projects', component: OurProjectsComponent },
    { path: 'Gallery', component: GalleryComponent },
    { path: 'FAQ', component: FAQComponent },
    { path: 'Contact', component: ContactComponent },
    { path: 'Get-Quote', component: GetQuoteComponent },
    { path: 'Terms-conditions', component: TermsConditionsComponent },
    { path: 'Privacy-policy', component: PrivacyPolicyComponent },

    { path: '**', component: NotFoundComponent },

];
