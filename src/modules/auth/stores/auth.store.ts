import { computed, onMounted, reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { loginAction } from '../actions'
import { AuthStatus, type User } from '../interfaces'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const authStatus = ref<AuthStatus>(AuthStatus.CHECKING)
  const token = ref<string>('')
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

  onMounted(() => {
    const localStorageToken = localStorage.getItem('token')

    token.value = localStorageToken ?? ''
  })

  watch(token, () => {
    localStorage.setItem('token', token.value)
  })

  return {
    login,
    authError,
    isWaiter: computed(() => user.value?.roles.includes('waiter') ?? false),
  }
})
