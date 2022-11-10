export default [
    {
        path: '/unit',
        name: 'unit',
        component: () => import('@/views/unit/Index.vue'),
        meta: {
            title: 'Unit',
            requireAuth: true
        }
    },
    {
        path: '/unit/create',
        name: 'unit.create',
        component: () => import('@/views/unit/Create.vue'),
        meta: {
            title: 'Tambah Unit',
            requireAuth: true
        }
    },
    {
        path: '/unit/edit/:id',
        name: 'unit.edit',
        component: () => import('@/views/unit/Edit.vue'),
        meta: {
            title: 'Ubah Unit',
            requireAuth: true
        }
    }
]