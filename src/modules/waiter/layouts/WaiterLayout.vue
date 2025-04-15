<script setup lang="ts">
import AppFooter from '@/modules/common/components/AppFooter.vue'
import AppHeader from '@/modules/common/components/AppHeader.vue'

const routes = [
  { to: { name: 'waiter-orders' }, title: 'Orders' },
  { to: { name: 'waiter-menu' }, title: 'Menu' },
]
</script>

<template>
  <AppHeader :routes="routes" />

  <main class="max-w-4xl mx-auto mt-5 md:mt-10 px-2">
    <RouterView />
  </main>

  <AppFooter />
</template>
