<script setup lang="ts">
import { useAuth } from '@clerk/vue'

const { isSignedIn } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-6">
    <h1 class="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
      Enterprise Clinic Scheduler
    </h1>
    <p class="text-xl text-slate-600 max-w-2xl mb-10">
      A secure, multi-tenant booking platform built for modern healthcare
      providers. Manage your clinic, staff, and patients with zero friction.
    </p>
    <div class="flex gap-4">
      <router-link
        v-if="isSignedIn"
        to="/dashboard"
        class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
      >
        Go to Dashboard
      </router-link>
      <router-link
        v-else
        to="/sign-in"
        class="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition shadow-sm"
      >
        Staff Login
      </router-link>
    </div>
  </div>
</template>
