import type { RouteRecordRaw } from 'vue-router'
import { isAdminGuard } from '../guards/is-admin.guard'

export const adminRoutes: RouteRecordRaw = {
  path: '/admin',
  name: 'admin',
  beforeEnter: [isAdminGuard],
  redirect: { name: 'admin-dashboard' },
  component: () => import('../layouts/AdminLayout.vue'),
  children: [
    {
      path: '',
      name: 'admin-dashboard',
      redirect: { name: 'orders' },
      // component: () => import('../views/AdminDashboard.vue'),
    },
  ],
}
