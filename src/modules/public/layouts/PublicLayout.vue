<script setup lang="ts">
import AppHeader from '@/modules/common/components/AppHeader.vue'
import AppFooter from '@/modules/common/components/AppFooter.vue'

const routes = [
  { to: { name: 'home' }, title: 'Home' },
  { to: { name: 'public-menu' }, title: 'Menu' },
]
</script>

<template>
  <AppHeader :routes="routes" />

  <main class="max-w-4xl mx-auto mt-5 md:mt-10">
    <RouterView />
  </main>

  <AppFooter />
</template>
