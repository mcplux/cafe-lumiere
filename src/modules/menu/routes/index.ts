import type { RouteRecordRaw } from 'vue-router'

export const menuRoutes: RouteRecordRaw = {
  path: '/menu',
  component: () => import('../layouts/MenuLayout.vue'),
  children: [
    {
      path: '',
      name: 'menu',
      component: () => import('../views/MenuView.vue'),
    },
    {
      path: 'management',
      children: [
        {
          path: '',
          name: 'menu-management',
          component: () => import('../views/MenuManagementView.vue'),
        },
      ],
    },
  ],
}
