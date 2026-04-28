# Unified Enterprise Identity & Multi-Tenancy (Clinic OS)

This repository serves as a reference architecture for implementing a secure, multi-tenant B2B2C application using a unified identity layer. By offloading complex cryptographic session management and tenant isolation to **Clerk**, we have built a system that maintains high security standards while providing a seamless developer experience across different frontend frameworks.

## 🏛 Architectural Vision

The core philosophy of this project is **Identity as Infrastructure**. Instead of building bespoke authentication silos, we treat identity as a cross-cutting concern that remains consistent whether accessed via React, Vue, or any future micro-frontend.

### Key Architectural Pillars:

1.  **Tenant Isolation (B2B):**
    Utilizing Clerk's **Organizations** architecture, we enforce strict data siloing. Users operate within a specific "Clinic" context, ensuring zero data bleed. The UI dynamically adapts to the active organization membership.

2.  **Cryptographic RBAC:**
    We moved beyond simple role strings to **Permission-based Access Control**. By evaluating specific claims (e.g., `org:sys_billing:manage`) directly within the JWT, we protect sensitive operations at the component level.

3.  **Framework Parity:**
    This project demonstrates that the modern identity stack is framework-agnostic. We achieved identical feature sets in both **React 19** and **Vue 3**, leveraging:
    *   **React Hooks** (`useAuth`, `useOrganization`)
    *   **Vue Composables** (`useAuth`, `useOrganization`)

4.  **Hybrid Authentication UX:**
    We avoided the "Redirect-to-Identity-Provider" anti-pattern by embedding **Headless and Pre-built Components** directly into custom application routes (`/sign-in`), maintaining total brand control.

---

## 🏗 Repository Structure

*   [`/reactapp-with-clerk`](./reactapp-with-clerk): React 19 + Vite implementation using Component-based route protection.
*   [`/vueapp-with-clerk`](./vueapp-with-clerk): Vue 3 + Vite implementation using centralized route protection and Slot-based patterns.
*   [`PRODUCTION.md`](./PRODUCTION.md): Technical roadmap for transitioning from shared development sessions to isolated production domains.

---

## ⚡ Technical Highlights

### Unified Route Protection
We implemented two distinct but equally secure protection strategies:
*   **Declarative (React):** Wrapping routes in high-order components/wrappers.
*   **Centralized (Vue):** Using route-level interception within the main application controller.

### The "Single-Sign-On" (SSO) Effect
Due to the browser's domain-scoped cookie model, we've demonstrated how multiple applications on the same host (or subdomains in production) can share a unified session. Logging into the React portal automatically authenticates the user in the Vue dashboard, provided they share the same Clerk instance.

## 🚀 Scaling to Production
As this architecture moves to production, the focus shifts from `localhost` port-agnostic cookies to **First-Party Domain Cookies**. By configuring a primary domain (e.g., `clinicos.com`) and utilizing CNAME records for the Clerk Frontend API, we ensure that the entire ecosystem shares a secure, hardware-secured session layer that is resistant to cross-site tracking mitigations.
