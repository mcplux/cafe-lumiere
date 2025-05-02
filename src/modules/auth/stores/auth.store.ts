import { computed, reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { checkAuthStatusAction, loginAction } from '../actions'
import { AuthStatus, type User } from '../interfaces'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const authStatus = ref<AuthStatus>(AuthStatus.CHECKING)
  const token = ref<string>(localStorage.getItem('token') ?? '')
  const authError = reactive({ error: false, message: '' })

  const login = async (email: string, password: string): Promise<boolean> => {
    authStatus.value = AuthStatus.CHECKING

    try {
      const loginResponse = await loginAction(email, password)

      if (!loginResponse.ok) {
        authStatus.value = AuthStatus.UNAUTHENTICATED
        Object.assign(authError, { error: true, message: loginResponse.message })
        return false
      }

      token.value = loginResponse.token
      authStatus.value = AuthStatus.AUTHENTICATED
      user.value = loginResponse.user

      return true
    } catch (error) {
      console.error(error)
      Object.assign(authError, { error: true, message: 'Something went wrong' })

      return false
    } finally {
      setTimeout(() => {
        Object.assign(authError, { error: false, message: '' })
      }, 2000)
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
    authError,
    login,
    checkAuthStatus,
    logout,
    isAuthenticated: computed(() => authStatus.value === AuthStatus.AUTHENTICATED),
    isAdmin: computed(() => user.value?.roles?.includes('admin') ?? false),
    isWaiter: computed(() => user.value?.roles?.includes('waiter') ?? false),
  }
})
