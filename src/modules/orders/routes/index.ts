import type { RouteRecordRaw } from 'vue-router'

import { isAuthenticatedGuard } from '@/modules/auth/guards/is-authenticated.guard'

export const orderRoutes: RouteRecordRaw = {
  path: '/orders',
  beforeEnter: [isAuthenticatedGuard],
  component: () => import('@/modules/common/layouts/AppLayout.vue'),
  children: [
    {
      path: '',
      name: 'orders',
      component: () => import('../views/OrdersView.vue'),
    },
    {
      path: 'new',
      name: 'new-order',
      component: () => import('../views/NewOrderView.vue'),
    },
    {
      path: ':id',
      name: 'order',
      component: () => import('../views/OrderView.vue'),
    },
    {
      path: ':id/edit',
      name: 'edit-order',
      component: () => import('../views/EditOrderView.vue'),
    },
  ],
}
