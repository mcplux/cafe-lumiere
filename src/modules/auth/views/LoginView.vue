<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { useAuthStore } from '../stores/auth.store'

interface FormData {
  email: string
  password: string
}

const router = useRouter()
const toast = useToast()

const authStore = useAuthStore()

const submitHandler = async ({ email, password }: FormData) => {
  const [ok, msg] = await authStore.login(email, password)
  if (!ok) {
    toast.error(msg)
  } else {
    toast.success(msg)
    if (authStore.isWaiter) {
      return router.replace({ name: 'waiter' })
    }
    if (authStore.isAdmin) {
      return router.replace({ name: 'admin' })
    }
  }
}
</script>

<template>
  <h2 class="text-4xl text-center font-bold">Login</h2>

  <FormKit type="form" submit-label="Log in" @submit="submitHandler">
    <FormKit type="email" label="Email" name="email" validation="required|email" />
    <FormKit type="password" label="Password" name="password" validation="required" />
  </FormKit>
</template>
