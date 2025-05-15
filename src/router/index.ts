import { createRouter, createWebHistory } from 'vue-router'

import { publicRoutes } from '@/modules/public/routes'
import { authRoutes } from '@/modules/auth/routes'
import { waiterRoutes } from '@/modules/waiter/routes'
import { adminRoutes } from '@/modules/admin/routes'
import { menuRoutes } from '@/modules/menu/routes'
import { orderRoutes } from '@/modules/orders/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [publicRoutes, authRoutes, waiterRoutes, adminRoutes, menuRoutes, orderRoutes],
})

export default router
