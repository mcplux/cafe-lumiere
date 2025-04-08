<script setup lang="ts">
import { useRouter } from 'vue-router'

const routes = [
  { to: { name: 'home' }, title: 'Home' },
  { to: { name: 'public-menu' }, title: 'Menu' },
]

const router = useRouter()
</script>

<template>
  <header class="sticky top-0">
    <div class="bg-amber-500 text-white px-5 py-7 flex items-center justify-between shadow-lg">
      <RouterLink class="text-3xl md:text-4xl font-bold text-gray-50" :to="'/'"
        >Café Lumière</RouterLink
      >

      <div class="flex gap-5">
        <RouterLink
          v-for="route in routes"
          :key="route.to.name"
          :to="route.to"
          class="font-bold"
          :class="router.currentRoute.value.name === route.to.name ? 'text-white' : 'text-gray-100'"
        >
          {{ route.title }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>
