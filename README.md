# Khalifa Glass

> A production-oriented bilingual corporate website for **Khalifa Glass**, built with Angular, SSR, responsive UI, authentication, quotation management, and a protected admin workflow.

[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![SCSS](https://img.shields.io/badge/SCSS-Architecture-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![SSR](https://img.shields.io/badge/Angular-SSR-orange)](https://angular.dev/guide/ssr)

## Overview

Khalifa Glass is a bilingual Arabic/English corporate web application designed for a glass and aluminium company.

The project combines a polished marketing website with real application functionality:

- Company pages for services, projects, gallery, FAQ, and contact
- Arabic / English language switching with RTL / LTR support
- Server-side rendering and prerendering
- Google Identity Services authentication
- JWT access tokens and refresh tokens
- Authenticated quotation requests with image uploads
- User quotation history
- Admin-only quotation management
- Quote status updates and deletion
- Responsive UI with reusable Angular components
- SEO metadata and Open Graph support
- Centralized SCSS design system
- Loading and alert feedback states
- API-driven projects, categories, services, and gallery content

## Screenshots

> Add real screenshots here before publishing the repository.

| Home | Services |
|---|---|
| `docs/screenshots/home.png` | `docs/screenshots/services.png` |

| Projects | Quote Request |
|---|---|
| `docs/screenshots/projects.png` | `docs/screenshots/get-quote.png` |

| Admin Quotes | Arabic / RTL |
|---|---|
| `docs/screenshots/admin-quotes.png` | `docs/screenshots/arabic.png` |

## Architecture

```text
src/
├── app/
│   ├── core/
│   │   ├── constants/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── models/
│   │   └── services/
│   │
│   ├── layout/
│   │   ├── navbar/
│   │   ├── footer/
│   │   └── floating-buttons/
│   │
│   ├── pages/
│   │   ├── home/
│   │   ├── about-us/
│   │   ├── company-services/
│   │   ├── our-projects/
│   │   ├── gallery/
│   │   ├── faq/
│   │   ├── contact/
│   │   ├── get-quote/
│   │   ├── admin-quotes/
│   │   ├── privacy-policy/
│   │   └── terms-conditions/
│   │
│   └── shared/
│       ├── components/
│       └── services/
│
├── assets/
│   ├── i18n/
│   ├── images/
│   └── icons/
│
├── environments/
└── styles/
    ├── abstracts/
    ├── base/
    └── components/
```

### Layer responsibilities

- **Core** — application-wide services, authentication, guards, interceptors, API models, and constants.
- **Layout** — global navigation and persistent UI.
- **Pages** — route-level features and page-specific sections.
- **Shared** — reusable UI components and content services.
- **Styles** — centralized design tokens, mixins, animations, theme, and component styles.

## Tech Stack

### Frontend

- Angular
- TypeScript
- Standalone Components
- Angular Router
- Angular SSR
- Angular Hydration
- Reactive Forms
- RxJS
- SCSS
- Bootstrap 5
- Font Awesome
- ngx-translate
- SweetAlert2

### Authentication

- Google Identity Services
- Backend-based Google authentication
- JWT access token
- Refresh token
- Angular HTTP interceptor
- Route guards
- Admin role protection

### Backend Integration

The frontend communicates with a separate ASP.NET API.

Main application flows include:

```text
Google Login
    ↓
Angular
    ↓
ASP.NET API
    ↓
JWT + Refresh Token
    ↓
Authenticated Angular Requests
```

```text
Get Quote
    ↓
Reactive Form
    ↓
FormData + Images
    ↓
ASP.NET API
    ↓
Quote Storage
    ↓
Admin Dashboard
```

## Main Features

### 🌍 Bilingual Experience

The application supports:

- English
- Arabic
- RTL / LTR switching
- Persistent language preference
- Browser language detection
- Translated UI content
- Translated SEO metadata

### 🔐 Authentication & Authorization

Users authenticate through Google Identity Services.

The application then receives application tokens from the backend and uses:

- Access token authentication
- Refresh token flow
- Auth interceptor
- Authentication guard
- Admin guard
- Protected quotation workflow
- Admin-only quote management

### 📋 Quote Management

Authenticated users can:

- Submit project details
- Select services and project type
- Provide budget information
- Choose preferred contact method
- Upload project images
- View previous quotation requests

Admins can:

- View all quotes
- Filter by status
- Open quote details
- Preview uploaded images
- Change quote status
- Delete quotes

### 🎨 UI / UX

The UI follows a custom Khalifa Glass design system:

- Green brand palette
- Glassmorphism elements
- Soft shadows
- Rounded cards
- Responsive layouts
- Reusable section headers
- Loading states
- Alert / confirmation dialogs
- Mobile navigation

## SEO

The application includes an SEO service responsible for:

- Dynamic page titles
- Meta descriptions
- Keywords
- Open Graph metadata
- Twitter card metadata
- Canonical URLs
- Language-aware SEO content

The project also uses SSR/prerendering to improve crawlability and initial page rendering.

> SEO is still an area planned for final portfolio polish: every public route should have its own complete metadata, canonical strategy, social image, and structured data where appropriate.

## Installation

### Requirements

Recommended local environment:

- Node.js
- npm
- Angular CLI compatible with the project version

### Clone

```bash
git clone https://github.com/YOUR_USERNAME/khalifa-glass.git
cd khalifa-glass
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm start
```

Open:

```text
http://localhost:4200/
```

### Production build

```bash
npm run build
```

### SSR

```bash
npm run build
npm run serve:ssr:mega-glass
```

## Environment Configuration

Google authentication uses an environment configuration.

Example:

```ts
export const environment = {
  clientIdGoogle: 'YOUR_GOOGLE_CLIENT_ID'
};
```

Do not commit private credentials, secrets, API keys, refresh tokens, or production-only configuration to the repository.

For a portfolio repository, public browser OAuth client IDs may be visible by design, but their authorized origins and redirect configuration must be restricted correctly in Google Cloud.

## API Configuration

The frontend currently centralizes API endpoints in:

```text
src/app/core/constants/api.constants.ts
```

For the final portfolio version, the API base URL should be moved completely into Angular environment configuration instead of being hardcoded inside application constants.

Recommended structure:

```text
src/environments/
├── environment.ts
└── environment.development.ts
```

## Testing

The project contains Angular unit-test files for:

- Components
- Services
- Guards
- Interceptors

Run:

```bash
npm test
```

Before presenting the repository as portfolio-ready, the tests should be expanded beyond creation/spec scaffolding to cover real application behavior.

## Code Quality Goals

The project is intentionally structured around:

- Standalone Angular components
- Dependency injection with `inject()`
- Feature-based page organization
- Centralized API constants
- Reusable services
- Reactive forms
- Typed request/response models
- Route guards
- HTTP interceptors
- SSR-safe browser APIs
- SCSS design tokens and mixins

## Security Notes

Authentication and authorization are enforced by the backend; frontend guards are for navigation and UX and must never be considered the security boundary.

Important production considerations include:

- Backend authorization must remain authoritative.
- Refresh-token handling should use the safest architecture supported by the backend.
- Sensitive tokens should not be exposed unnecessarily to JavaScript.
- API CORS policy should be restricted to trusted origins.
- Uploaded files must be validated server-side.
- Image size/type limits must be enforced by the backend.
- Admin endpoints must require server-side role authorization.
- Error responses should not expose sensitive backend details.

## Deployment

The project is designed to work with an SSR-capable Node hosting environment.

The complete application can be deployed as:

```text
Browser
   ↓
Angular SSR Frontend
   ↓
ASP.NET Web API
   ↓
SQL Database
```

The frontend and backend are intentionally separated so that the UI, API, authentication, and data layers can evolve independently.

## Roadmap

### High Priority

- [ ] Upgrade Angular from the current v19 baseline to a supported Angular release
- [ ] Convert route-level pages to lazy-loaded routes
- [ ] Move API URLs to environment configuration
- [ ] Remove development-only imports from production services
- [ ] Replace remaining `any` types with explicit interfaces
- [ ] Strengthen JWT parsing and authentication state handling
- [ ] Prevent concurrent refresh-token requests
- [ ] Improve admin guard navigation behavior
- [ ] Make Contact publicly accessible unless authentication is intentionally required
- [ ] Expand unit tests to cover real behavior
- [ ] Add production error / empty / loading states consistently

### SEO & Accessibility

- [ ] Add page-specific SEO metadata to every public route
- [ ] Add canonical URLs and social preview images
- [ ] Add structured data where appropriate
- [ ] Audit image `alt` attributes
- [ ] Audit keyboard navigation and focus states
- [ ] Verify heading hierarchy
- [ ] Add sitemap / robots configuration for the final production domain

### Performance

- [ ] Optimize all large images
- [ ] Use modern image formats consistently
- [ ] Add lazy loading to below-the-fold images
- [ ] Use route-level lazy loading
- [ ] Review third-party JavaScript loading
- [ ] Measure Lighthouse / Core Web Vitals before final publication

## Portfolio Checklist

Before adding this repository to a CV or portfolio:

1. Use the final **Khalifa Glass** branding consistently.
2. Add 4–6 high-quality screenshots.
3. Add a short live-demo link.
4. Add a clear architecture diagram.
5. Add the backend repository link.
6. Add a short demo video or GIF if possible.
7. Make sure the production build passes.
8. Run the full test suite.
9. Remove debug `console.log` statements.
10. Remove dead code and unused imports.
11. Add proper error and empty states.
12. Complete SEO and accessibility checks.
13. Upgrade to a currently supported Angular release.
14. Make sure no secrets or private credentials are committed.

## Project Status

**Current status:** Feature-rich portfolio project, but still requires a final engineering-polish pass before being presented as the user's flagship repository.

The strongest parts of the project are its real application functionality, authentication flow, bilingual RTL/LTR experience, SSR setup, quotation workflow, admin workflow, and separation of concerns.

The next step is not adding more features. The priority should be **quality, security, testing, performance, SEO, accessibility, and cleanup**.

## License

This project is intended as a portfolio project for Khalifa Glass.

If you want to reuse the source code, contact the author first.
