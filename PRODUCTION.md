# Production Deployment Guide (Clinic OS)

This guide outlines the technical steps required to transition the Enterprise Clinic Scheduler from a Clerk Development Instance to a Production Instance.

## 1. Clerk Instance Transition
Development instances use shared Clerk domains. Production requires your own domain to manage secure, first-party session cookies.

1.  **Create Production Instance:** In the [Clerk Dashboard](https://dashboard.clerk.com/), select your application and click **"Deploy to Production"**.
2.  **Domain Configuration:** Connect your production domain (e.g., `app.clinicos.com`).
3.  **DNS Records:** Add the CNAME records provided by Clerk to your DNS provider. This enables Clerk to handle sessions via your own domain, preventing third-party cookie issues.

## 2. Environment Configuration
Update your environment variables in your hosting provider (Vercel, Netlify, AWS, etc.). You must switch from test keys to live keys.

```env
# Replace in your production environment
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxx
```

## 3. Session Sharing Architecture
In development, the React and Vue apps shared sessions because they both resided on `localhost`.

*   **Subdomain Strategy:** If we deploy the apps to subdomains of the same root (e.g., `react.clinicos.com` and `vue.clinicos.com`), they will **automatically share the session** because Clerk scopes cookies to the root domain (`.clinicos.com`).
*   **Cross-Domain Strategy:** If the apps are on entirely different domains, we must configure [Satellite Domains](https://clerk.com/docs/references/nextjs/satellite-domains) within Clerk to maintain the single sign-on (SSO) experience.

## 4. Permission & Role Replication
Clerk settings **do not** automatically sync from Development to Production. We must manually re-create the following in the Production Dashboard:
1.  Navigate to **Organizations > Roles**.
2.  Create the `Manage Billing` permission with the key: `org:sys_billing:manage`.
3.  Assign this permission to the **Admin** role.

## 5. Deployment Build
Always ensure the production build is generated using the live environment variables.

### React Application
```bash
cd reactapp-with-clerk
npm install
npm run build
```

### Vue Application
```bash
cd vueapp-with-clerk
pnpm install
pnpm build
```

## 6. Production Security Checklist
- [ ] **Email/SMS:** Ensure DNS records for system emails are verified.
- [ ] **Redirects:** Update "Allowed Redirect URLs" in Clerk to match your production domain.
- [ ] **Social Providers:** If using Google/GitHub, update the Authorized Redirect URIs in the respective developer consoles.
