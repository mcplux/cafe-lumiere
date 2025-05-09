import type { RouteRecordRaw } from 'vue-router'

import { isWaiterGuard } from '../guards/is-waiter.guard'

export const waiterRoutes: RouteRecordRaw = {
  path: '/waiter',
  name: 'waiter',
  redirect: { name: 'waiter-orders' },
  beforeEnter: [isWaiterGuard],
  component: () => import('../layouts/WaiterLayout.vue'),
  children: [
    {
      path: 'orders',
      component: () => import('../layouts/WaiterOrdersLayout.vue'),
      children: [
        {
          path: '',
          name: 'waiter-orders',
          component: () => import('../views/WaiterOrdersView.vue'),
        },
        {
          path: 'new',
          name: 'waiter-new-order',
          component: () => import('../views/WaiterNewOrderView.vue'),
        },
        {
          path: ':id',
          name: 'waiter-order',
          component: () => import('../views/WaiterOrderView.vue'),
        },
        {
          path: ':id/edit',
          name: 'waiter-edit-order',
          component: () => import('../views/WaiterEditOrderView.vue'),
        },
      ],
    },
  ],
}
