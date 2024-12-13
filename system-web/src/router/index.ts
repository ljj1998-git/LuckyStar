import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/system',
      name: 'system',
      component: () => import('@/layout/LayoutDefault.vue'),
      children: [
        {
          path: 'user',
          name: 'user',
          component: () => import('@/views/system/user/index.vue'),
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('@/views/system/role/index.vue'),
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('@/views/system/menu/index.vue'),
        },
        {
          path: 'department',
          name: 'department',
          component: () => import('@/views/system/department/index.vue'),
        },
      ],
    },
  ],
})

export default router
