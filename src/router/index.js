import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/store/auth'
import unit from './unit'
import tenant from './tenant'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        title: 'Login Page',
        authPage: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard.vue'),
      meta: {
        title: 'Dashboard',
        requireAuth: true
      }
    },
    ...unit, 
    ...tenant
  ]
})

router.beforeEach(async (to, from, next) => {
  const DEFAULT_TITLE = 'Nusatara Tower APP'

  const auth = useAuth()
  await auth.getUser()

  document.title = to.meta.title || DEFAULT_TITLE

  if (to.meta.requireAuth) {
    (auth.authenticated) ? next() : next({ name: 'login' })
  }

  if (to.meta.authPage) {
    (!auth.authenticated) ? next() : next({name: 'dashboard'})
  }
})

export default router
