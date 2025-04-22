<script setup lang="ts">
import type { MenuItem } from '@/modules/menu/interfaces'
import OrderMenuItemCard from './OrderMenuItemCard.vue'

defineProps<{
  menuItems: MenuItem[]
}>()

defineEmits<{
  addOrderItem: [menuItemId: MenuItem['id']]
}>()
</script>

<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold">Menu</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5">
      <OrderMenuItemCard
        v-for="menuItem in menuItems"
        :key="menuItem.id"
        :menu-item="menuItem"
        @add-order-item="(menuItemId) => $emit('addOrderItem', menuItemId)"
      />
    </div>
  </div>
</template>
