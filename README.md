# Rahul Sodanapalli — Technical Portfolio Platform

An elite, high-performance portfolio application built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and Lenis smooth scrolling. The application utilizes a robust production-grade microservices-oriented frontend architecture designed for WCAG accessibility compliance and sub-1.5s paint times.

---

## 🏛️ Project Architecture

The client application follows enterprise architectural design patterns separating layout, business logic, reactive store state, and data fetching services:

```text
src/
├── assets/
│   ├── images/              # Project screenshots and illustrations
│   └── icons/               # Custom visual assets & custom SVGs
├── components/
│   ├── admin/               # Administrative dashboard controls & CRUD forms
│   ├── common/              # Generic atom UI modules (MagneticButton, ParticleCanvas)
│   ├── layout/              # Structural grids (Navbar, Footer, MainLayout)
│   └── sections/            # Visual components extracted from pages (ProjectCard, ProjectModal)
├── constants/               # Decoupled links, menu structures, and default fallbacks
├── guards/                  # Route-level security gates (AdminRoute)
├── hooks/                   # Reactive custom hooks (useAuth, useTerminalTyping)
├── pages/                   # Main page viewport compositions (Home, AdminDashboard)
├── sections/                # Main section wrappers composed of reusable components
├── services/
│   └── api/                 # Scalable RTK Query API endpoints (projectsApi, contactApi, etc.)
├── store/                   # Centralized Redux Toolkit configurations and slices (authSlice)
├── types/                   # Unified, strictly-typed production interfaces
└── utils/                   # Shared utility helpers (Swal alerts, formatting tools)
```

---

## ⚙️ Centralized Links Configuration

All external links are decoupled from the presentation components for ease of maintenance. You can update your CV PDF, GitHub, LinkedIn, or Email within seconds inside [src/constants/urls.ts](file:///Users/rahul/Desktop/Rahul_PortFolio/rahulbuilds.dev/client/src/constants/urls.ts):

```typescript
export const SOCIAL_LINKS = {
  github: "https://github.com/rahulsodanapalli",
  linkedin: "https://linkedin.com/in/rahul-sodanapalli-0a49062b3",
  email: "mailto:rahulsodanapalli@gmail.com",
  resume: "/resume.pdf", // Swap with a hosted PDF URL or drop resume.pdf inside public/
};
```

Standard navigation viewport sections and engineer roles are managed inside [src/constants/menu.ts](file:///Users/rahul/Desktop/Rahul_PortFolio/rahulbuilds.dev/client/src/constants/menu.ts).

---

## 🔒 Environment Secrets & Git Safeguards

To comply with enterprise security practices, local secrets and server transmission URLs are kept out of public repositories:
- All `.env` and `.env.*` configuration files are ignored by git rules mapped in the root `.gitignore`.
- Production values are handled directly through hosted cloud environmental variables (e.g. Vercel, Render, Netlify variables) or secure local-only files.

### Establishing Local Variables
Create a `.env` or `.env.production` file inside the `client/` folder:
```bash
# client/.env.production
VITE_API_URL=https://your-live-portfolio-server.com
```

---

## 🚀 Execution & Command Reference

Verify your packages and launch the node servers:

### 1. Installation
Install project modules:
```bash
npm install
```

### 2. Development Execution
Launch the local dev server:
```bash
npm run dev
```

### 3. Production Compilation Build
Type-check and bundle production assets:
```bash
npm run build
```

### 4. Code Quality Linting
Validate strict typescript and react configs:
```bash
npm run lint
```
