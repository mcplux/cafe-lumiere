<script setup lang="ts">
import AppHeader from '@/modules/common/components/AppHeader.vue'
</script>

<template>
  <AppHeader />

  <main class="max-w-4xl mx-auto mt-5 md:mt-10">
    <RouterView />
  </main>

  <footer class="text-center text-gray-400 text-sm mt-10 mb-5">
    &copy; Café Lumière. All rights reserved {{ new Date().getFullYear() }}
  </footer>
</template>
