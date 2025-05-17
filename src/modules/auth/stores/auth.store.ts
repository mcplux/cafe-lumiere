import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { checkAuthStatusAction, loginAction } from '../actions'
import { AuthStatus, type User } from '../interfaces'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const authStatus = ref<AuthStatus>(AuthStatus.CHECKING)
  const token = ref<string>(localStorage.getItem('token') ?? '')

  const login = async (email: string, password: string): Promise<[boolean, string]> => {
    authStatus.value = AuthStatus.CHECKING

    try {
      const response = await loginAction(email, password)

      if (!response.ok) {
        authStatus.value = AuthStatus.UNAUTHENTICATED
        return [false, response.message]
      }

      token.value = response.token
      authStatus.value = AuthStatus.AUTHENTICATED
      user.value = response.user

      return [true, 'User authenticated successfully']
    } catch (error) {
      if (error instanceof Error) {
        authStatus.value = AuthStatus.UNAUTHENTICATED
        return [false, error.message]
      }

      console.error(error)
      return [false, 'Something went wrong while loggin in user']
    }
  }

  const checkAuthStatus = async (): Promise<boolean> => {
    authStatus.value = AuthStatus.CHECKING

    try {
      const response = await checkAuthStatusAction()

      if (!response.ok) {
        return logout()
      }

      authStatus.value = AuthStatus.AUTHENTICATED
      user.value = response.user

      return true
    } catch {
      return logout()
    }
  }

  const logout = (): false => {
    user.value = null
    authStatus.value = AuthStatus.UNAUTHENTICATED
    token.value = ''
    localStorage.removeItem('token')

    return false
  }

  watch(token, () => {
    localStorage.setItem('token', token.value)
  })

  return {
    login,
    checkAuthStatus,
    logout,
    isAuthenticated: computed(() => authStatus.value === AuthStatus.AUTHENTICATED),
    isAdmin: computed(() => user.value?.roles?.includes('admin') ?? false),
    isWaiter: computed(() => user.value?.roles?.includes('waiter') ?? false),
  }
})
