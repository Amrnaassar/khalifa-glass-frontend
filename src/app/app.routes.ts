import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // ============================================================
  // HOME
  // Eager-loaded intentionally for the initial page / SSR.
  // ============================================================
  {
    path: '',
    component: HomeComponent
  },

  // ============================================================
  // PUBLIC ROUTES
  // Lazy-loaded
  // ============================================================
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/about-us/about-us.component')
        .then(m => m.AboutUsComponent)
  },

  {
    path: 'services',
    loadComponent: () =>
      import('./pages/company-services/company-services.component')
        .then(m => m.CompanyServicesComponent)
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/our-projects/our-projects.component')
        .then(m => m.OurProjectsComponent)
  },

  {
    path: 'gallery',
    loadComponent: () =>
      import('./pages/gallery/gallery.component')
        .then(m => m.GalleryComponent)
  },

  {
    path: 'faq',
    loadComponent: () =>
      import('./pages/faq/faq.component')
        .then(m => m.FAQComponent)
  },

  // ============================================================
  // AUTHENTICATED ROUTES
  // Lazy-loaded + Auth Guard
  // ============================================================


  {
    path: 'contact',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/contact/contact.component')
        .then(m => m.ContactComponent)
  },

  {
    path: 'get-quote',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/get-quote/get-quote.component')
        .then(m => m.GetQuoteComponent)
  },

  // ============================================================
  // LEGAL PAGES
  // Lazy-loaded
  // ============================================================
  {
    path: 'terms-conditions',
    loadComponent: () =>
      import('./pages/terms-conditions/terms-conditions.component')
        .then(m => m.TermsConditionsComponent)
  },

  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component')
        .then(m => m.PrivacyPolicyComponent)
  },

  // ============================================================
  // ADMIN
  // Lazy-loaded + Authentication + Admin Authorization
  // ============================================================
  {
    path: 'admin/quotes',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./pages/admin-quotes/admin-quotes.component')
        .then(m => m.AdminQuotesComponent)
  },

  // ============================================================
  // NOT FOUND
  // Must remain the last route.
  // ============================================================
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component')
        .then(m => m.NotFoundComponent)
  }

];