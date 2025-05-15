<script setup lang="ts">
import AppHeader from '@/modules/common/components/AppHeader.vue'
import AppFooter from '@/modules/common/components/AppFooter.vue'
</script>

<template>
  <AppHeader />

  <main class="max-w-4xl mx-auto mt-5 md:mt-10">
    <RouterView />
  </main>

  <AppFooter />
</template>
