# MYM Car Rental — Frontend

A modern, responsive, production-ready car rental web application built with **Angular 20, TypeScript, Angular SSR, and Signals**.

The application provides a complete customer rental experience together with a dedicated administration dashboard for managing vehicles, categories, users, and bookings.

It integrates with the **MYM Car Rental ASP.NET Core Web API** and is designed with a focus on performance, maintainability, responsive design, accessibility, SEO, authentication, and multilingual support.

---

## 🚗 Overview

**MYM Car Rental Frontend** is the Angular client application for the MYM Car Rental platform.

The application provides two main experiences:

### Customer Platform

Customers can:

* Browse available rental cars
* Explore featured vehicles
* View detailed vehicle information
* Compare rental plans
* Select pickup and return dates
* Create rental bookings
* View their booking history
* Cancel eligible bookings
* Authenticate with Google
* Switch between Arabic and English

### Administration Platform

Authorized administrative users can:

* View dashboard statistics
* Manage rental cars
* Manage car categories
* Manage vehicle images
* Manage users
* Manage user roles
* Manage bookings
* Update booking statuses

---

# ✨ Key Features

## 🚘 Car Rental Experience

The customer-facing application includes a complete vehicle discovery workflow.

Customers can:

* Browse cars
* View featured cars
* Filter and explore vehicle information
* Open detailed car pages
* View vehicle specifications
* View rental pricing
* Select daily, weekly, or monthly rental plans
* Select rental dates
* Continue to the booking workflow

---

## 📅 Multi-Step Booking

The booking experience is divided into clear steps to simplify the rental process.

```text
Step 1
Select Rental Dates
        ↓
Step 2
Select Rental Plan
        ↓
Step 3
Review Booking
        ↓
Step 4
Confirm Booking
```

The frontend communicates with the backend API for server-side booking validation and creation.

The backend remains responsible for:

* Availability validation
* Date validation
* Price calculation
* Booking conflicts
* Final booking creation

This keeps important business rules on the server instead of relying exclusively on client-side validation.

---

# 💰 Rental Plans

The application supports:

```text
Daily
Weekly
Monthly
```

Rental pricing is retrieved from the backend and displayed according to the selected vehicle and rental plan.

The booking interface dynamically calculates the rental duration and displays the relevant pricing information before confirmation.

---

# 🔐 Authentication

The application includes a complete authentication flow.

Supported functionality:

* Google Sign-In
* Current-user initialization
* JWT authentication
* Refresh-token flow
* Logout
* Protected routes
* Authentication state management

Authentication is integrated with the backend using secure authentication cookies.

---

# 🛡️ Route Protection

Angular route guards protect authenticated areas of the application.

Protected customer routes include:

```text
/booking
/my-bookings
```

The administration area is protected through authentication and role-based authorization.

Administrative access is controlled according to the user's role returned by the backend.

---

# 👨‍💼 Admin Dashboard

The application includes a dedicated administration interface.

```text
/admin
```

The admin area is separated from the customer-facing experience and includes its own layout, navigation, pages, and reusable components.

### Dashboard

Provides an administrative overview with:

* Statistics
* Platform navigation
* Quick access to management areas

### Cars Management

Administrators can:

* Create cars
* Edit cars
* Delete cars
* Manage rental prices
* Manage specifications
* Upload images
* Delete images
* Set primary images
* Set featured status
* Activate/deactivate vehicles

### Categories Management

Administrators can:

* Create categories
* Edit categories
* Delete categories
* Manage category information
* Manage category images
* Activate/deactivate categories

### Users Management

The user management area supports:

* User listing
* User details
* Role management
* Administrative user operations

### Bookings Management

Administrators can:

* View bookings
* Open booking details
* Review customer information
* Review rental information
* Manage booking statuses

---

# 🌍 Internationalization

The application supports both:

🇸🇦 **Arabic**

🇬🇧 **English**

The language system dynamically handles:

* Translated UI content
* HTML `lang` attribute
* Text direction
* RTL/LTR layout
* Navigation direction
* Shared translated components

```text
Arabic
  ↓
RTL

English
  ↓
LTR
```

Translations are maintained using `ngx-translate`.

Translation files:

```text
src/assets/i18n/
├── ar.json
└── en.json
```

The application is designed so that customer-facing content can be presented naturally in both languages.

---

# 📱 Responsive Design

The UI is designed with a mobile-first mindset and adapts across:

* Mobile devices
* Tablets
* Laptops
* Desktop screens

Responsive behavior is implemented using:

* SCSS
* CSS media queries
* Flexible layouts
* Responsive components
* Mobile navigation patterns

The customer experience and administration dashboard are both designed to remain usable across different screen sizes.

---

# ⚡ Angular Signals

The application uses **Angular Signals** for reactive state management where appropriate.

Examples include:

* Loading state
* Selected car
* Selected rental plan
* Rental dates
* Rental duration
* Authentication state
* Admin data
* UI state

Signals help keep component state explicit and reduce unnecessary complexity.

---

# 🔄 HTTP Interceptors

The application uses HTTP interceptors to centralize API communication and authentication behavior.

Implemented interceptor responsibilities include:

### Credentials

Handles credential-aware HTTP communication with the backend.

### Refresh Token

Handles authentication renewal when the access token expires.

### SSR Authentication

Supports authentication-cookie forwarding during server-side rendering requests.

This keeps authentication logic centralized instead of duplicating it across individual services.

---

# 🧩 Component Architecture

The application follows a feature-oriented Angular structure.

```text
src/
└── app/
    │
    ├── admin/
    │   ├── layout/
    │   ├── pages/
    │   │   ├── dashboard/
    │   │   ├── cars/
    │   │   ├── categories/
    │   │   ├── users/
    │   │   └── bookings/
    │   │
    │   ├── core/
    │   │   └── services/
    │   │
    │   └── shared/
    │       ├── sidebar/
    │       ├── topbar/
    │       ├── stat-card/
    │       ├── admin-page-header/
    │       └── confirm-dialog/
    │
    ├── core/
    │   ├── guards/
    │   ├── interceptors/
    │   ├── models/
    │   ├── services/
    │   └── initializers/
    │
    ├── features/
    │   ├── home/
    │   ├── cars/
    │   ├── booking/
    │   ├── login/
    │   ├── about-us/
    │   ├── company-services/
    │   ├── contact/
    │   ├── faq/
    │   └── not-found/
    │
    ├── layout/
    │   └── public/
    │       ├── customer-layout/
    │       └── navbar/
    │
    └── shared/
        └── components/
            └── date-picker/
```

This structure separates:

* Application-wide infrastructure
* Customer features
* Administration features
* Layout components
* Shared reusable components

---

# 🧭 Routing

Angular Router is used with lazy-loaded routes/components.

Main customer routes include:

```text
/
/about-us
/cars
/cars/:id
/booking
/my-bookings
/faq
/contact
/services
/login
/admin
```

Protected customer routes:

```text
/booking
/my-bookings
```

The admin area uses its own layout and route configuration.

Lazy loading helps keep the initial application bundle smaller by loading feature areas when required.

---

# 🖥️ Server-Side Rendering

The application uses **Angular SSR** to render pages on the server before the client application is hydrated.

SSR provides benefits such as:

* Improved initial rendering
* Better SEO support
* Search-engine-friendly HTML
* Better social sharing metadata
* Improved first-load experience

The application is configured with an Express-based SSR server.

---

# 💧 Hydration

Angular hydration is enabled to allow the browser to take over the server-rendered application.

The project also uses:

* Angular hydration
* Event replay
* SSR-aware services
* SSR authentication handling

This provides a smoother transition from server-rendered HTML to the interactive Angular application.

---

# 🔎 SEO

SEO considerations are integrated into the application.

Supported metadata includes:

* Dynamic page titles
* Meta descriptions
* Open Graph metadata
* Twitter card metadata
* Robots metadata
* Canonical URLs

SEO metadata can be managed according to the current route and page content.

---

# 🔌 API Integration

The frontend communicates with the ASP.NET Core backend through RESTful APIs.

Main frontend services include:

```text
Authentication
Cars
Car Categories
Bookings
Admin Cars
Admin Categories
Admin Users
Admin Bookings
Admin Dashboard
```

The frontend does not contain the core rental business rules.

Instead:

```text
Angular Frontend
       │
       │ REST API
       ▼
ASP.NET Core Backend
       │
       ▼
PostgreSQL
```

This separation keeps the frontend focused on presentation, interaction, and client-side state while the backend remains responsible for business rules and persistence.

---

# 🛠️ Technology Stack

| Technology            | Purpose                          |
| --------------------- | -------------------------------- |
| **Angular 20**        | Frontend framework               |
| **TypeScript**        | Application programming language |
| **Angular Signals**   | Reactive state management        |
| **Angular Router**    | Application routing              |
| **Angular SSR**       | Server-side rendering            |
| **Angular Hydration** | Client hydration                 |
| **RxJS**              | Reactive programming             |
| **Reactive Forms**    | Form management and validation   |
| **SCSS**              | Styling                          |
| **ngx-translate**     | Arabic / English localization    |
| **Font Awesome**      | UI icons                         |
| **Express**           | SSR server                       |
| **REST APIs**         | Backend communication            |

---

# 🗂️ Project Structure

```text
MYM-Car-Rental-Frontend/
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── core/
│   │   ├── features/
│   │   ├── layout/
│   │   └── shared/
│   │
│   ├── assets/
│   │   └── i18n/
│   │       ├── ar.json
│   │       └── en.json
│   │
│   ├── environments/
│   ├── index.html
│   └── main.ts
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Angular CLI
* Git

You also need access to the MYM Car Rental backend API.

---

## Clone the Repository

```bash
git clone https://github.com/Amrnaassar/mym-car-rental-frontend.git

cd mym-car-rental-frontend
```

---

## Install Dependencies

```bash
npm install
```

---

# ⚙️ Environment Configuration

Configure the backend API URL through the Angular environment configuration.

Typical files include:

```text
src/environments/environment.ts
src/environments/environment.development.ts
```

Example:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5145/api'
};
```

For production, use the deployed backend API URL.

> Production secrets and private credentials should never be committed to the repository.

---

# ▶️ Development

Start the Angular development server:

```bash
npm start
```

Then open the local URL displayed by Angular CLI.

---

# 🏗️ Production Build

Create a production build:

```bash
ng build --configuration production
```

The production output is generated under the configured `dist` directory.

---

# 🖥️ Run SSR Production Build

Build the application:

```bash
ng build --configuration production
```

Then run the generated SSR server:

```bash
node dist/mym-car-rental/server/server.mjs
```

The SSR server starts using the configured production server settings.

---

# 🧪 Testing

The project includes Angular unit tests covering application components and services.

Run the test suite with:

```bash
npm test
```

The project is continuously tested during development to verify:

* Components
* Services
* Admin functionality
* Booking-related logic
* Application behavior

---

# 📦 Production Readiness

The application has been prepared for production deployment with:

* Production Angular build
* Angular SSR
* Hydration
* Lazy-loaded routes
* Environment-based API configuration
* Authentication handling
* Refresh-token flow
* Responsive UI
* SEO metadata
* Arabic / English localization
* RTL / LTR support

The production SSR build can be executed successfully using the generated Node server.

---

# ☁️ Deployment

The frontend can be deployed to modern Node-compatible hosting platforms.

The deployment architecture is:

```text
                    ┌──────────────────────┐
                    │   MYM Car Rental     │
                    │       Frontend       │
                    │   Angular 20 + SSR   │
                    └──────────┬───────────┘
                               │
                               │ HTTPS / REST
                               ▼
                    ┌──────────────────────┐
                    │   MYM Car Rental     │
                    │       Backend        │
                    │ ASP.NET Core Web API  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      PostgreSQL      │
                    └──────────────────────┘
```

For production deployment, make sure the frontend points to the deployed backend API and that the backend allows the production frontend origin through CORS.

---

# 🔗 Backend Repository

The Angular application communicates with the MYM Car Rental ASP.NET Core API.

**MYM Car Rental Backend**

https://github.com/Amrnaassar/mym-car-rental-backend

---

# 🎯 Engineering Principles

The frontend is developed around several engineering principles:

* Feature-based organization
* Separation of concerns
* Reusable components
* Centralized API communication
* Centralized authentication handling
* Server-side business validation
* Lazy loading
* Reactive state management
* Responsive design
* Internationalization
* SEO readiness
* SSR compatibility
* Maintainable SCSS architecture

The goal is to keep the application scalable without introducing unnecessary complexity.

---

# 📌 Project Status

**Frontend:** Production-ready / deployment preparation

Implemented functionality includes:

* Customer-facing rental platform
* Car browsing
* Car details
* Multi-step booking
* Customer bookings
* Authentication
* Google Sign-In
* Refresh-token flow
* Admin dashboard
* Car management
* Category management
* User management
* Booking management
* Arabic / English localization
* RTL / LTR support
* Angular SSR
* Hydration
* SEO metadata
* Responsive design
* Production build

---

# 👨‍💻 Author

## Omar Fathi Salah

**Full-Stack Software Engineer**

Specialized in:

* Angular
* TypeScript
* ASP.NET Core
* C#
* Entity Framework Core
* PostgreSQL
* RESTful APIs
* Full-Stack Web Development

---

# 🔗 Project Repositories

### Frontend

https://github.com/Amrnaassar/mym-car-rental-frontend

### Backend

https://github.com/Amrnaassar/mym-car-rental-backend

---

## 📄 License

This project is private and developed for the **MYM Car Rental** platform.
