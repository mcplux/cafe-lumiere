<script setup lang="ts">
import type { MenuItem } from '../interfaces'

defineProps<{
  item: MenuItem
}>()
</script>

<template>
  <div class="border border-gray-700 p-2">
    <div class="h-64 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="w-full h-full object-cover object-center"
      />
    </div>
    <h3 class="text-lg font-bold">{{ item.name }}</h3>
    <div class="mt-2">
      <RouterLink
        :to="{ name: 'edit-menu-item', params: { id: item.id } }"
        class="block text-center p-1 text-white rounded bg-blue-600"
      >
        Edit
      </RouterLink>
    </div>
  </div>
</template>
