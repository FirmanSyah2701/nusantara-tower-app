import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/auth/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard.vue')
    },
    {
      path: '/unit',
      name: 'unit',
      component: () => import('@/views/unit/Index.vue')
    },
    {
      path: '/unit/create',
      name: 'unit.create',
      component: () => import('@/views/unit/Create.vue')
    },
    {
        path: '/unit/edit/:id',
        name: 'unit.edit',
        component: () => import('@/views/unit/Edit.vue')
    },
    {
      path: '/tenant',
      name: 'tenant',
      component: () => import('@/views/tenant/Index.vue')
    },
    {
      path: '/tenant/create',
      name: 'tenant.create',
      component: () => import('@/views/tenant/Create.vue')
    },
    {
        path: '/tenant/edit/:id',
        name: 'tenant.edit',
        component: () => import('@/views/tenant/Edit.vue')
    }
  ]
})

export default router
