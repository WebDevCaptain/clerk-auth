# Enterprise Clinic Scheduler (Clinic OS)

## Overview
The Enterprise Clinic Scheduler is a modern, multi-tenant B2B2C Web Application designed for medical professionals and healthcare organizations. It provides a secure, scalable foundation for managing clinic schedules, patient pipelines, and administrative tasks across multiple isolated clinic environments.

This application is built with a developer-first identity architecture, completely offloading complex cryptographic session management, tenant isolation, and routing security to Clerk, while maintaining a pixel-perfect, branded user interface.

## Tech Stack
* **Framework:** React 19 + Vite (TypeScript)
* **Identity & Access Management (CIAM):** Clerk (Core 3 / v6)
* **Routing:** React Router v7 (Client-side SPA)
* **Styling:** Tailwind CSS v4 (Vite-native esbuild integration)

## Core Architecture & Features

### 1. Robust Multi-Tenancy (B2B)
The application utilizes Clerk's **Organizations** architecture to silo data and user access. Medical professionals can be invited to multiple distinct clinics (tenants). The UI context dynamically updates based on the user's active organization, ensuring zero data bleed between isolated clinic environments.

### 2. Granular Role-Based Access Control (RBAC)
Security is enforced at the component level using Clerk's `<Show>` API. Instead of binary "admin vs. user" roles, the system evaluates specific cryptographic permissions (e.g., `org:sys_billing:manage`). If a user's JSON Web Token (JWT) lacks the required permission, sensitive UI elements gracefully degrade into locked, read-only states, preventing client-side execution attacks.

### 3. Integrated, Branded Authentication
Rather than redirecting users to external, unbranded identity providers, the application embeds Clerk's headless and pre-built components natively into custom React Router paths (e.g., `/sign-in`). This ensures a seamless, branded onboarding and login experience without sacrificing enterprise-grade security.

### 4. SPA Route Protection
The React component tree is fundamentally wrapped in strict authentication boundaries. Unauthenticated users are gracefully intercepted and redirected away from the `/dashboard/*` namespace, while public marketing and discovery routes remain highly performant and accessible.

## Quick Start Setup

**1. Install Dependencies**
```bash
npm install
```

**2. Environment Configuration**
Create a `.env.local` file in the root directory and add your Clerk Publishable Key:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
```

**3. Run the Development Server**
```bash
npm run dev
```

## Key Learnings & Clerk Integration

Through this project, we have explored how Clerk v6 simplifies identity management. Our key implementations and takeaways include:

### 1. The "Provider-First" Integration
* **Global Auth Context:** We wrapped the application in `<ClerkProvider>` to gain instant access to user state across the entire component tree.
* **Router Bridge:** We integrated React Router's `navigate` function with the provider to ensure seamless client-side navigation during auth redirects, avoiding full page reloads.

### 2. Declarative Route Protection
* **Access Control as UI:** We used the `<Show>` component to define visibility boundaries directly in our JSX, making auth logic readable and declarative.
* **Graceful Interception:** We implemented `<RedirectToSignIn />` to protect sensitive routes like `/dashboard`, ensuring unauthenticated users are redirected safely with an automatic return path.

### 3. Branded Multi-Tenant (B2B) Architecture
* **Zero-Config Organizations:** We utilized the `<OrganizationSwitcher />` to manage tenant selection and isolation without building custom backend logic for multi-tenancy.
* **Dynamic Tenant Context:** We used the `useOrganization()` hook to drive UI changes based on the active clinic context.

### 4. Permission-Based RBAC (Clerk v6)
* **Granular Security:** We implemented role-based access control using specific permissions (e.g., `org:billing:manage`) rather than basic roles, checking these against the user's JWT.
* **Atomic UI States:** We used the `fallback` prop in `<Show>` to ensure that users without proper permissions see a secure, read-only interface instead of a broken page.

### 5. Custom Auth Flows
* **Internalized Experience:** We embedded Clerk's `<SignIn />` component into our own custom pages, keeping users within our branded domain throughout the entire authentication lifecycle.

### 6. Modern Tech Stack Alignment
* **Future-Proofing:** We confirmed that Clerk v6 integrates smoothly with the latest versions of **React 19**, **Vite 8**, and **Tailwind CSS v4**, requiring minimal boilerplate for a high-security setup.
