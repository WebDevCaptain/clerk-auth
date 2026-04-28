import { createRouter, createWebHistory } from 'vue-router'
import PublicLandingPage from '../pages/PublicLandingPage.vue'
import CustomSignInPage from '../pages/CustomSignInPage.vue'
import ClinicDashboard from '../pages/ClinicDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PublicLandingPage,
    },
    {
      path: '/sign-in/:pathMatch(.*)*',
      name: 'sign-in',
      component: CustomSignInPage,
    },
    {
      path: '/dashboard/:pathMatch(.*)*',
      name: 'dashboard',
      component: ClinicDashboard,
    },
  ],
})

export default router
