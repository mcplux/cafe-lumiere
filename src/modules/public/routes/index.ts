import type { RouteRecordRaw } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'

export const publicRoutes: RouteRecordRaw = {
  path: '/',
  component: PublicLayout,
  children: [
    {
      path: 'menu',
      name: 'public-menu',
      component: () => import('../views/PublicMenuView.vue'),
    },
  ],
}
