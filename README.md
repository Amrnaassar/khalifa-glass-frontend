# 🏢 Khalifa Glass — Frontend

> **A modern, multilingual Angular frontend for the Khalifa Glass full-stack web application.**

Khalifa Glass is a modern web application built for a glass & aluminium company, designed to provide customers with a professional digital experience for exploring services, viewing projects, submitting quotation requests, and managing their requests.

The frontend is built with **Angular and TypeScript**, and communicates with a dedicated **ASP.NET Core Web API** for authentication, quotations, project data, media handling, and other backend operations.

This project was built with a focus on **clean architecture, reusable components, responsive design, authentication, performance, accessibility, and real-world frontend/backend integration**.

---

# 🚀 Overview

The application goes beyond a traditional company website.

It combines a public-facing website with authenticated user functionality and administrative workflows.

### Main capabilities

* 🌍 Arabic & English localization
* ↔️ Full RTL / LTR support
* ⚡ Angular SSR & Hydration
* 🔐 Authentication
* 🔵 Google Sign-In
* 🛡️ Route Guards
* 🔑 JWT authentication flow
* ♻️ Refresh token handling
* 📝 Reactive Forms
* 📋 Online quotation system
* 📸 Project image uploads
* 👤 User quotation history
* 👨‍💼 Admin quotation management
* 🖼️ Dynamic projects & gallery
* 📱 Responsive design
* 🎨 Custom SCSS design system
* 🔎 SEO metadata
* 🌐 Open Graph metadata
* 🔗 REST API integration

---

# 🛠️ Tech Stack

| Technology                | Purpose                       |
| ------------------------- | ----------------------------- |
| **Angular**               | Frontend framework            |
| **TypeScript**            | Application development       |
| **SCSS**                  | Styling & design system       |
| **Angular Router**        | Navigation & route management |
| **Reactive Forms**        | Forms & validation            |
| **Angular SSR**           | Server-side rendering         |
| **Hydration**             | Client-side hydration         |
| **RxJS**                  | Reactive data handling        |
| **REST API**              | Backend communication         |
| **JWT**                   | Authentication                |
| **Google Authentication** | User sign-in                  |
| **Font Awesome**          | Icons                         |
| **Vercel**                | Deployment                    |

---

# 🏗️ Frontend Architecture

The application is organized to separate application-wide functionality from reusable UI elements and feature-specific pages.

```text id="a8r7dw"
src/
│
├── app/
│   │
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── services/
│   │   └── models/
│   │
│   ├── shared/
│   │   ├── components/
│   │   └── services/
│   │
│   ├── pages/
│   │   ├── home/
│   │   ├── about/
│   │   ├── services/
│   │   ├── projects/
│   │   ├── gallery/
│   │   ├── quotation/
│   │   ├── profile/
│   │   └── admin/
│   │
│   ├── app.component.*
│   ├── app.routes.ts
│   └── app.config.ts
│
├── assets/
│   ├── images/
│   └── ...
│
├── styles/
│   ├── abstracts/
│   ├── base/
│   ├── components/
│   └── utilities/
│
└── main.ts
```

The application separates **core functionality, shared UI, services, guards, interceptors, models, and feature pages**, making the project easier to maintain and extend.

---

# 🎨 UI & Design System

The interface was designed around a modern, premium visual identity suitable for a glass & aluminium company.

The frontend uses a centralized SCSS structure instead of scattering styling across unrelated files.

### Design principles

* Clean layouts
* Strong visual hierarchy
* Consistent spacing
* Reusable UI patterns
* Responsive behavior
* Accessible interaction
* Consistent typography
* Consistent color usage
* Mobile-first considerations

The styling architecture is organized into reusable layers:

```text id="qj7c7g"
styles/
│
├── abstracts/
│   ├── variables
│   └── ...
│
├── base/
│   ├── reset
│   ├── typography
│   └── ...
│
├── components/
│
├── utilities/
│
└── main.scss
```

This makes it easier to maintain a consistent visual language throughout the application.

---

# 🌍 Arabic & English Support

One of the important requirements of the project was supporting both Arabic and English users.

The interface supports:

```text id="8p5qbc"
English
  ↓
LTR

Arabic
  ↓
RTL
```

The layout direction changes according to the active language.

This affects more than text translation.

The UI also handles:

* Navigation
* Spacing
* Alignment
* Icons
* Forms
* Content direction
* Component layouts

The result is a more natural experience for both Arabic and English users.

---

# ⚡ Server-Side Rendering & Hydration

The application uses **Angular SSR and hydration** to improve the initial rendering experience and provide a stronger foundation for SEO.

The rendering flow can be represented as:

```text id="x8upz5"
User Request
     │
     ▼
Angular Server
     │
     ▼
HTML Response
     │
     ▼
Browser
     │
     ▼
Angular Hydration
     │
     ▼
Interactive Application
```

This is particularly useful for public-facing pages where search engine visibility and initial page rendering matter.

---

# 🔐 Authentication

Authentication is integrated between the Angular frontend and the ASP.NET Core API.

The frontend handles the client-side authentication flow while the backend remains responsible for validating credentials and issuing tokens.

### Authentication flow

```text id="o1xwq8"
User
 │
 ├── Email / Password
 │
 └── Google Sign-In
          │
          ▼
    Angular Frontend
          │
          ▼
    ASP.NET Core API
          │
          ▼
     JWT Tokens
          │
          ▼
 Protected Application
```

The frontend includes dedicated authentication services and route protection mechanisms.

---

# 🛡️ Route Guards

Protected pages are guarded so that users cannot access authenticated areas without a valid authentication state.

Examples include:

* Profile
* User quotations
* Admin functionality

Conceptually:

```text id="g2w3fq"
User
 │
 ▼
Protected Route
 │
 ▼
Authentication Guard
 │
 ├── Authenticated ──► Allow Access
 │
 └── Not Authenticated
          │
          ▼
       Login
```

This keeps authentication-related navigation logic centralized instead of repeating checks across individual components.

---

# 🔑 HTTP Interceptors

HTTP interceptors are used to centralize authentication-related API communication.

Instead of manually attaching authentication information to every API request, the interceptor handles the request pipeline.

```text id="w0xxj3"
Angular Service
      │
      ▼
HTTP Request
      │
      ▼
HTTP Interceptor
      │
      ├── Attach Token
      │
      └── Handle Authentication State
      │
      ▼
ASP.NET Core API
```

This makes API communication cleaner and easier to maintain.

---

# 📋 Quotation Workflow

Quotation requests are one of the main interactive features of the application.

Customers can submit their project requirements through the frontend and attach relevant images.

### User flow

```text id="8g9nkn"
Customer
   │
   ▼
Quotation Form
   │
   ├── Project Information
   ├── Contact Information
   └── Project Images
   │
   ▼
Reactive Form Validation
   │
   ▼
FormData
   │
   ▼
ASP.NET Core API
```

The frontend handles:

* Form state
* Validation
* User feedback
* Image selection
* FormData creation
* API communication
* Loading states
* Error handling
* Success states

---

# 📸 Image Uploads

The quotation flow supports uploading project images.

The frontend prepares the request using `FormData` so text fields and image files can be sent together.

```text id="k6b5ep"
Form
 │
 ├── Text Fields
 │
 └── Images
       │
       ▼
    FormData
       │
       ▼
 Angular HTTP Client
       │
       ▼
 ASP.NET Core API
       │
       ▼
 Cloudinary
```

This allows users to provide visual references for their quotation requests.

---

# 👤 User Experience

Authenticated users have access to their quotation-related information.

The frontend provides functionality for:

* Viewing submitted quotations
* Checking quotation status
* Viewing quotation details
* Managing profile-related information
* Accessing authenticated areas

The goal is to give users visibility into their requests instead of relying entirely on manual communication.

---

# 👨‍💼 Admin Experience

The frontend also contains administrative functionality for managing quotation requests.

Administrators can interact with quotation data through dedicated UI flows connected to protected backend endpoints.

```text id="o9cyte"
Admin
  │
  ▼
Admin Route
  │
  ▼
Route Guard
  │
  ▼
ASP.NET Core API
  │
  ▼
Quotation Management
```

This creates a complete workflow between customer submissions and administrative processing.

---

# 🔗 API Integration

The frontend communicates with a separate ASP.NET Core backend through RESTful APIs.

```text id="v3ck4k"
┌──────────────────────────────┐
│       Angular Frontend       │
│                              │
│ Components                   │
│ Services                     │
│ Guards                       │
│ Interceptors                 │
│ Forms                        │
└──────────────┬───────────────┘
               │
               │ REST API
               ▼
┌──────────────────────────────┐
│      ASP.NET Core API        │
│                              │
│ Controllers                  │
│ Services                     │
│ Authentication               │
│ Business Logic               │
└──────────────┬───────────────┘
               │
               ▼
          SQL Server
```

The frontend is therefore not dependent on hardcoded application data for its main business workflows.

---

# 📱 Responsive Design

The application was designed to work across different screen sizes.

The responsive implementation covers:

* Desktop
* Laptop
* Tablet
* Mobile

Special attention was given to:

* Navigation
* Hero sections
* Forms
* Cards
* Project galleries
* Quotation pages
* Tables / lists
* Admin interfaces

The goal was to maintain the same overall experience while adapting layouts to smaller screens.

---

# 🧩 Reusable Components

A major focus of the frontend architecture is component reusability.

Instead of rebuilding similar UI elements for every page, reusable components are used for common patterns.

Examples include:

* Navigation
* Footer
* Buttons
* Forms
* Cards
* Modals
* Loading states
* Alerts
* Image-related UI
* Shared layout elements

This reduces duplication and makes future changes easier.

---

# 📝 Reactive Forms

Angular Reactive Forms are used for interactive application forms.

They provide:

* Strong form structure
* Validation
* Form state management
* Error handling
* Dynamic controls
* Easier integration with API requests

For example:

```text id="v7s9j1"
Form
 │
 ├── Validation
 │
 ├── User Input
 │
 ├── Error State
 │
 └── Submit
       │
       ▼
     API
```

This approach keeps form behavior predictable and maintainable.

---

# 🔎 SEO

Because Khalifa Glass is a public-facing business website, SEO was considered as part of the frontend implementation.

The application includes page-level metadata and Open Graph information to improve how pages can appear in search engines and social sharing contexts.

Key considerations include:

* Page titles
* Meta descriptions
* Open Graph metadata
* Semantic HTML
* Server-side rendering
* Proper content structure

---

# ⚡ Performance Considerations

The application uses Angular SSR and hydration as part of its rendering strategy.

Other frontend considerations include:

* Reusable components
* Centralized services
* Lazy-loaded application areas where appropriate
* Optimized asset usage
* Avoiding unnecessary duplication
* Structured styling

The goal is to keep the application responsive as the project grows.

---

# 🔄 Frontend Data Flow

A typical business request follows this pattern:

```text id="8h7w0s"
User Interaction
       │
       ▼
Angular Component
       │
       ▼
Angular Service
       │
       ▼
HTTP Interceptor
       │
       ▼
ASP.NET Core API
       │
       ▼
Business Logic
       │
       ▼
Database / External Service
       │
       ▼
API Response
       │
       ▼
Angular Service
       │
       ▼
Component / UI
```

This keeps UI concerns separate from API communication and backend responsibilities.

---

# 🧠 What I Focused On

This project was not only about creating attractive pages.

The main focus was building a frontend that behaves like part of a real application.

I worked on:

**Component Architecture**

Reusable UI elements instead of duplicated markup.

**Application Architecture**

Separating core services, shared functionality, and feature-specific pages.

**Authentication**

Connecting Google authentication and JWT-based API authentication.

**API Integration**

Connecting Angular services with a dedicated ASP.NET Core backend.

**Forms**

Building validated reactive forms and multipart requests.

**Internationalization**

Supporting Arabic and English with RTL/LTR layouts.

**Performance**

Using SSR and hydration for better rendering and SEO foundations.

**Responsive UX**

Making the application usable across desktop and mobile devices.

---

# 🚀 Deployment

The frontend is deployed on **Vercel**.

### Production

```text id="q4tw9d"
Angular Application
        │
        ▼
      Vercel
        │
        ▼
Production Website
```

### Live Application

https://khalifa-glass.vercel.app/

---

# 🔗 Related Repository

The Angular application communicates with the separate Khalifa Glass backend.

### Backend API

https://github.com/Amrnaassar/KhalifaGlassApis

### Frontend

https://github.com/Amrnaassar/khalifa-glass-frontend

---

# ▶️ Getting Started

## Prerequisites

Make sure you have:

* Node.js
* npm
* Angular CLI
* Git

---

## 1. Clone the repository

```bash id="c0e6vp"
git clone https://github.com/Amrnaassar/khalifa-glass-frontend.git
```

```bash id="g4b9wl"
cd khalifa-glass-frontend
```

---

## 2. Install dependencies

```bash id="b5w8vx"
npm install
```

---

## 3. Start the development server

```bash id="p3u5f9"
ng serve
```

Then open:

```text id="3i5gko"
http://localhost:4200
```

---

## 4. Production build

```bash id="f4r7e2"
ng build
```

---

# ⚙️ Environment Configuration

The frontend communicates with the ASP.NET Core API through environment-specific configuration.

Typical configuration includes:

```text id="2x9q4m"
API Base URL
Google Client ID
Application URLs
Other public frontend configuration
```

Sensitive backend credentials should never be placed in the Angular application.

---

# 🔒 Security Notes

The frontend follows several principles to reduce unnecessary exposure of sensitive information:

* Backend secrets remain on the server
* API authentication is handled through the backend
* Protected routes use guards
* HTTP requests pass through centralized interceptors
* API communication is performed over HTTPS in production
* Authentication state is handled centrally

> Frontend applications should never contain database passwords, JWT signing keys, SMTP passwords, Cloudinary secrets, or other backend credentials.

---

# 📌 Key Frontend Features

| Feature           | Implementation            |
| ----------------- | ------------------------- |
| Framework         | Angular                   |
| Language          | TypeScript                |
| Styling           | SCSS                      |
| Rendering         | SSR + Hydration           |
| Authentication    | JWT + Google              |
| Route Protection  | Angular Guards            |
| API Communication | HTTP Client / REST API    |
| Forms             | Reactive Forms            |
| Localization      | Arabic + English          |
| Direction         | RTL + LTR                 |
| Media Upload      | FormData                  |
| SEO               | Metadata + Open Graph     |
| Responsive UI     | Desktop / Tablet / Mobile |
| Deployment        | Vercel                    |

---

# 🎯 Project Goals

The frontend was built around several practical goals:

* Create a modern and professional company website
* Provide a smooth customer experience
* Support both Arabic and English users
* Build reusable Angular components
* Keep frontend responsibilities separated
* Integrate cleanly with the ASP.NET Core API
* Protect authenticated application areas
* Provide a complete quotation workflow
* Build a responsive experience
* Improve SEO and initial rendering
* Keep the codebase maintainable for future development

---

# 🚧 Future Improvements

Potential improvements for future versions include:

* Expanded automated testing
* More granular component testing
* Improved accessibility auditing
* Additional performance optimization
* Enhanced caching strategies
* Advanced admin dashboard functionality
* More detailed user notifications
* CI/CD automation
* Expanded analytics and monitoring

---

# 👨‍💻 Author

**Omar Fathi**

**Full-Stack Angular & .NET Developer**

Focused on building modern web applications with:

**Angular · TypeScript · ASP.NET Core · C# · Entity Framework Core · SQL Server**

---

# 🔗 Project Links

### 🌐 Live Application

https://khalifa-glass.vercel.app/

### 💻 Frontend Repository

https://github.com/Amrnaassar/khalifa-glass-frontend

### ⚙️ Backend Repository

https://github.com/Amrnaassar/KhalifaGlassApis

---

## ⭐ Feedback

If you find the project interesting, feel free to explore the repository and share your feedback.

Built with **Angular + ASP.NET Core** ❤️
