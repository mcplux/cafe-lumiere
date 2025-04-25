import type { RouteRecordRaw } from 'vue-router'
import { isNotAuthenticatedGuard } from '../guards/is-not-authenticated.guard'

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  component: () => import('../layouts/AuthLayout.vue'),
  beforeEnter: [isNotAuthenticatedGuard],
  redirect: { name: 'login' },
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
}
