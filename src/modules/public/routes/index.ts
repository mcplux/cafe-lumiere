import type { RouteRecordRaw } from 'vue-router'

import AppLayout from '@/modules/common/layouts/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

export const publicRoutes: RouteRecordRaw = {
  path: '/',
  component: AppLayout,
  children: [
    {
      path: '',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
    // {
    //   path: 'menu',
    //   name: 'public-menu',
    //   component: () => import('@/modules/common/views/MenuView.vue'),
    // },
  ],
}
