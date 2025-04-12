<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/auth.store'

interface FormData {
  email: string
  password: string
}

const router = useRouter()

const authStore = useAuthStore()

const submitHandler = async ({ email, password }: FormData) => {
  const response = await authStore.login(email, password)

  if (response && authStore.isWaiter) {
    router.replace({ name: 'waiter' })
  }

  if (response && authStore.isAdmin) {
    router.replace({ name: 'admin' })
  }
}
</script>

<template>
  <h2 class="text-4xl text-center font-bold">Login</h2>
  <p class="bg-red-400 mt-3 p-1 rounded text-center" v-if="authStore.authError.error">
    {{ authStore.authError.message }}
  </p>
  <FormKit type="form" submit-label="Log in" @submit="submitHandler">
    <FormKit type="email" label="Email" name="email" validation="required|email" />
    <FormKit type="password" label="Password" name="password" validation="required" />
  </FormKit>
</template>
