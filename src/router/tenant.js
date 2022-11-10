export default [
    {
        path: '/tenant',
        name: 'tenant',
        component: () => import('@/views/tenant/Index.vue'),
        meta: {
          requireAuth: true
        }
    },
    {
        path: '/tenant/create',
        name: 'tenant.create',
        component: () => import('@/views/tenant/Create.vue'),
        meta: {
          title: 'Tambah Tenant',
          requireAuth: true
        }
    },
    {
        path: '/tenant/edit/:id',
        name: 'tenant.edit',
        component: () => import('@/views/tenant/Edit.vue'),
        meta: {
          title: 'Ubah Tenant',
          requireAuth: true
        }
    }
]