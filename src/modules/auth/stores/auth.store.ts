import { onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { loginAction } from '../actions'
import { AuthStatus } from '../interfaces'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.CHECKING)
  const token = ref<string>('')

  const login = async (email: string, password: string): Promise<boolean> => {
    authStatus.value = AuthStatus.CHECKING

    const loginResponse = await loginAction(email, password)

    if (!loginResponse.ok) {
      authStatus.value = AuthStatus.UNAUTHENTICATED
      return false
    }

    token.value = loginResponse.token
    authStatus.value = AuthStatus.AUTHENTICATED

    return true
  }

  onMounted(() => {
    const localStorageToken = localStorage.getItem('token')

    token.value = localStorageToken ?? ''
  })

  watch(token, () => {
    localStorage.setItem('token', token.value)
  })

  return { login }
})
