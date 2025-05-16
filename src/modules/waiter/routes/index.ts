import type { RouteRecordRaw } from 'vue-router'

import { isWaiterGuard } from '../guards/is-waiter.guard'

export const waiterRoutes: RouteRecordRaw = {
  path: '/waiter',
  name: 'waiter',
  redirect: { name: 'orders' },
}
