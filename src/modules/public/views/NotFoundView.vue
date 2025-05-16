<script setup lang="ts">
import TitlePage from '@/modules/common/components/TitlePage.vue'
</script>

<template>
  <TitlePage title="This page isn't available" />

  <p class="mt-10 text-center">
    Sorry, the page you're trying to reach does not exist.
    <RouterLink :to="{ name: 'home' }" class="text-blue-700">Go back to home</RouterLink>
  </p>
</template>
