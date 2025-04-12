import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import { useAuthStore } from '../stores/auth.store'

export const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()
  await authStore.checkAuthStatus()

  if (!authStore.isAuthenticated) {
    return next()
  }

  if (authStore.isWaiter) {
    return next({ name: 'waiter' })
  }

  if (authStore.isAdmin) {
    return next({ name: 'admin' })
  }

  next()
}
