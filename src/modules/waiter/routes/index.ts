import type { RouteRecordRaw } from 'vue-router'

export const waiterRoutes: RouteRecordRaw = {
  path: '/waiter',
  name: 'waiter',
  component: import('../layouts/WaiterLayout.vue'),
}
