import type { RouteRecordRaw } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'

export const publicRoutes: RouteRecordRaw = {
  path: '/',
  component: PublicLayout,
  children: [
    {
      path: 'menu',
      name: 'public-menu',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PublicMenuView.vue'),
    },
  ],
}
