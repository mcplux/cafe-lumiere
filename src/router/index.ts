import { createRouter, createWebHashHistory } from 'vue-router'
import { publicRoutes } from '@/modules/public/routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [publicRoutes],
})

export default router
