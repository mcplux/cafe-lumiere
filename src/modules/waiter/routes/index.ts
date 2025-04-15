import type { RouteRecordRaw } from 'vue-router'

import { isWaiterGuard } from '../guards/is-waiter.guard'
import WaiterLayout from '../layouts/WaiterLayout.vue'
import WaiterOrdersLayout from '../layouts/WaiterOrdersLayout.vue'
import WaiterOrdersView from '../views/WaiterOrdersView.vue'

export const waiterRoutes: RouteRecordRaw = {
  path: '/waiter',
  name: 'waiter',
  redirect: { name: 'waiter-orders' },
  beforeEnter: [isWaiterGuard],
  component: WaiterLayout,
  children: [
    {
      path: 'orders',
      component: WaiterOrdersLayout,
      children: [
        {
          path: '',
          name: 'waiter-orders',
          component: WaiterOrdersView,
        },
        {
          path: 'new',
          name: 'waiter-new-order',
          component: import('../views/WaiterNewOrderView.vue'),
        },
      ],
    },
    {
      path: 'menu',
      name: 'waiter-menu',
      component: import('@/modules/common/views/MenuView.vue'),
    },
  ],
}
