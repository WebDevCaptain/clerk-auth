<script setup lang="ts">
import {
  OrganizationSwitcher,
  UserButton,
  Show,
  useOrganization,
} from '@clerk/vue'

const { organization, isLoaded } = useOrganization()
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <div v-if="!isLoaded" class="min-h-screen flex items-center justify-center bg-slate-50">
      <div class="animate-pulse text-slate-400 font-medium">
        Loading tenant context...
      </div>
    </div>

    <template v-else>
      <!-- Top Navigation -->
      <header class="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div class="flex items-center gap-6">
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">
            Clinic OS
          </h1>
          <div class="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <OrganizationSwitcher
            :hide-personal="true"
            :appearance="{
              elements: {
                organizationSwitcherTrigger:
                  'border border-slate-200 rounded-md px-3 py-1.5 hover:bg-slate-50 transition',
              },
            }"
          />
        </div>
        <UserButton after-sign-out-url="/" />
      </header>

      <!-- Main Workspace -->
      <main class="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8">
        <div v-if="!organization" class="flex flex-col items-center justify-center mt-20 text-center border-2 border-dashed border-slate-200 rounded-2xl p-12 bg-white">
          <h2 class="text-xl font-semibold text-slate-700 mb-2">
            No Active Clinic
          </h2>
          <p class="text-slate-500 mb-6 max-w-md">
            Select a clinic context from the top navigation menu to view
            schedules and patients.
          </p>
        </div>

        <div v-else class="space-y-8">
          <div>
            <h2 class="text-3xl font-bold text-slate-900">
              {{ organization.name }} Workspace
            </h2>
            <p class="text-slate-500 mt-1">
              Manage your daily schedule and administrative tasks.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Standard Card: Clinician Access -->
            <div class="p-6 bg-white border border-slate-200 shadow-sm rounded-xl hover:shadow-md transition">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-lg text-slate-900">
                  Daily Appointments
                </h3>
                <span class="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                  8 Today
                </span>
              </div>
              <p class="text-slate-600 mb-6">
                View and manage today's patient pipeline and medical notes.
              </p>
              <button class="w-full px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition">
                View Schedule
              </button>
            </div>

            <!-- RBAC Card: Admin Access Only via v6 <Show> -->
            <Show :when="{ permission: 'org:sys_billing:manage' }">
              <template #fallback>
                <div class="p-6 bg-slate-100 border border-slate-200 border-dashed rounded-xl flex flex-col justify-center items-center text-center opacity-70">
                  <svg
                    class="w-8 h-8 text-slate-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <h3 class="font-medium text-slate-700">
                    Restricted Access
                  </h3>
                  <p class="text-sm text-slate-500 mt-1">
                    Billing access requires Clinic Admin privileges.
                  </p>
                </div>
              </template>

              <div class="p-6 bg-white border border-red-100 shadow-sm rounded-xl relative overflow-hidden">
                <div class="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-semibold text-lg text-red-700">
                    Billing & Settings
                  </h3>
                  <span class="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                    Admin
                  </span>
                </div>
                <p class="text-slate-600 mb-6">
                  Manage subscription tiers, invoices, and organization
                  payment methods.
                </p>
                <button class="w-full px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg font-medium hover:bg-red-100 transition">
                  Manage Billing
                </button>
              </div>
            </Show>
          </div>
        </div>
      </main>
    </template>
  </div>
</template>
