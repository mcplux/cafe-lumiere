import type { RouteRecordRaw } from 'vue-router'

import { isWaiterGuard } from '../guards/is-waiter.guard'
import WaiterLayout from '../layouts/WaiterLayout.vue'

export const waiterRoutes: RouteRecordRaw = {
  path: '/waiter',
  name: 'waiter',
  redirect: { name: 'waiter-orders' },
  beforeEnter: [isWaiterGuard],
  component: WaiterLayout,
  children: [
    {
      path: 'orders',
      name: 'waiter-orders',
      component: import('../views/WaiterOrdersView.vue'),
    },
    {
      path: 'menu',
      name: 'waiter-menu',
      component: import('@/modules/common/views/MenuView.vue'),
    },
  ],
}
