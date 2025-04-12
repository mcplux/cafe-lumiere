import { createRouter, createWebHashHistory } from 'vue-router'

import { publicRoutes } from '@/modules/public/routes'
import { authRoutes } from '@/modules/auth/routes'
import { waiterRoutes } from '@/modules/waiter/routes'
import { adminRoutes } from '@/modules/admin/routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [publicRoutes, authRoutes, waiterRoutes, adminRoutes],
})

export default router
