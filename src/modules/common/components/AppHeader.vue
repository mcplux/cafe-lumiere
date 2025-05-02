<script setup lang="ts">
import AppMenu from './AppMenu.vue'

interface Props {
  routes: {
    to: { name: string }
    title: string
  }[]
}

defineProps<Props>()
</script>

<template>
  <header class="sticky top-0 z-10">
    <div class="bg-amber-500 text-white px-5 py-7 flex items-center justify-between shadow-lg">
      <RouterLink class="text-3xl md:text-4xl font-bold text-gray-50" :to="'/'">
        Café Lumière
      </RouterLink>

      <AppMenu />
    </div>
  </header>
</template>
