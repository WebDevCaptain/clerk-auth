<script setup lang="ts">
import { Show, RedirectToSignIn } from '@clerk/vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <template v-if="route.path.startsWith('/dashboard')">
    <Show when="signed-in">
      <router-view />
    </Show>
    <Show when="signed-out">
      <RedirectToSignIn />
    </Show>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>
