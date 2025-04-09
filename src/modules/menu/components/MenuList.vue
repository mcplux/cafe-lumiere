<script setup lang="ts">
import type { MenuItem } from '../interfaces'
import MenuCard from './MenuCard.vue'

interface Props {
  menuItems: MenuItem[]
}

defineProps<Props>()
</script>

<template>
  <div class="mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
    <MenuCard v-for="menuItem in menuItems" :key="menuItem.id" :menuItem="menuItem" />
  </div>
</template>
