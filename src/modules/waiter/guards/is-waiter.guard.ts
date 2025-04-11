import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/modules/auth/stores/auth.store'

export const isWaiterGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()
  await authStore.checkAuthStatus()

  // If is not authenticated
  if (!authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  // If is authenticated but not a waiter
  if (!authStore.isWaiter) {
    return next({ name: 'login' })
  }

  return next()
}
