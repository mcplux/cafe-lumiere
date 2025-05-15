import type { RouteRecordRaw } from 'vue-router'

export const orderRoutes: RouteRecordRaw = {
  path: '/orders',
  component: () => import('../layouts/OrdersLayout.vue'),
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
  ],
}
