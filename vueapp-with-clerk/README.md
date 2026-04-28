# Clinic OS (Vue 3 Implementation)

This is the Vue 3 + TypeScript implementation of the Clinic OS dashboard, demonstrating how to integrate Clerk authentication with the Vue Composition API.

## Tech Stack
* **Framework:** Vue 3 (Script Setup) + Vite
* **Identity:** @clerk/vue (v2)
* **Routing:** Vue Router 4
* **Styling:** Tailwind CSS v4

## Quick Start
```bash
pnpm install
pnpm dev
```

## Key Differences from React Implementation

While both applications use the modern Clerk v6 `<Show>` component for consistent logic, the implementation syntax differs due to framework patterns:

### 1. Props vs. Slots for Fallbacks
This is the most significant syntax difference between the two implementations:
*   **React (`ClinicDashboard.tsx`):** Uses the `fallback` **prop** to pass JSX.
    ```tsx
    <Show when={...} fallback={<div className="restricted">...</div>}>
      <AdminPanel />
    </Show>
    ```
*   **Vue (`ClinicDashboard.vue`):** Uses the `#fallback` **named slot**, which feels more idiomatic to Vue's template system.
    ```vue
    <Show :when="{ permission: '...' }">
      <template #fallback>
        <div class="restricted">...</div>
      </template>
      <AdminPanel />
    </Show>
    ```

### 2. Plugin vs. Provider
*   **React:** Requires wrapping the entire tree in a `<ClerkProvider>` component in `main.tsx`.
*   **Vue:** Uses a standard `app.use(clerkPlugin, ...)` pattern in `main.ts`, which is the standard way to inject global functionality in Vue 3.

### 3. Route Protection Logic
*   **React:** We handled protection directly inside the `Route` element in `App.tsx`.
*   **Vue:** We implemented a conditional check in `App.vue` using the `useRoute` hook to wrap the `<router-view />` based on the path, demonstrating a more centralized protection strategy.

## Developer Experience (DX)
*   **Composables:** The `useAuth()` and `useOrganization()` hooks map 1:1 with React's hooks, making it extremely easy for developers to switch between frameworks.
*   **Reactivity:** Clerk's state is fully reactive within Vue's ecosystem, allowing for clean `v-if` logic based on authentication state.
