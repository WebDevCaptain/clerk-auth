<script setup lang="ts">
import { SignIn } from '@clerk/vue'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900">
    <div class="w-full max-w-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white">Staff Portal</h1>
        <p class="text-slate-400 mt-2">
          Secure access for medical professionals
        </p>
      </div>

      <SignIn
        routing="path"
        path="/sign-in"
        fallback-redirect-url="/dashboard"
        :appearance="{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
            card: 'bg-white shadow-xl rounded-xl',
          },
        }"
      />
    </div>
  </div>
</template>
