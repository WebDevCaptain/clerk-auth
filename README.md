# Enterprise Clinic Scheduler (Clinic OS)

## Overview
The Enterprise Clinic Scheduler is a modern, multi-tenant B2B2C Web Application designed for medical professionals and healthcare organizations. It provides a secure, scalable foundation for managing clinic schedules, patient pipelines, and administrative tasks across multiple isolated clinic environments.

This application is built with a developer-first identity architecture, completely offloading complex cryptographic session management, tenant isolation, and routing security to Clerk, while maintaining a pixel-perfect, branded user interface.

## Tech Stack
* **Framework:** React 18 + Vite (TypeScript)
* **Identity & Access Management (CIAM):** Clerk (Core 3 / v6)
* **Routing:** React Router v6 (Client-side SPA)
* **Styling:** Tailwind CSS v4 (Vite-native esbuild integration)

## Core Architecture & Features

### 1. Robust Multi-Tenancy (B2B)
The application utilizes Clerk's **Organizations** architecture to silo data and user access. Medical professionals can be invited to multiple distinct clinics (tenants). The UI context dynamically updates based on the user's active organization, ensuring zero data bleed between isolated clinic environments.

### 2. Granular Role-Based Access Control (RBAC)
Security is enforced at the component level using Clerk's `<Show>` API. Instead of binary "admin vs. user" roles, the system evaluates specific cryptographic permissions (e.g., `org:billing:manage`). If a user's JSON Web Token (JWT) lacks the required permission, sensitive UI elements gracefully degrade into locked, read-only states, preventing client-side execution attacks.

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
