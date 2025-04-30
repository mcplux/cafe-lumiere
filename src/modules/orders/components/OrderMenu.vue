<script setup lang="ts">
import type { MenuItem } from '@/modules/menu/interfaces'
import OrderMenuItemCard from './OrderMenuItemCard.vue'
import { useMenuStore } from '@/modules/menu/stores/menu.store'
import { onMounted } from 'vue'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'

defineEmits<{
  addOrderItem: [menuItem: MenuItem]
}>()

const menuStore = useMenuStore()

onMounted(() => {
  menuStore.getMenuItems()
})
</script>

<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold">Menu</h2>

    <LoadingSpinner v-if="menuStore.isLoading" />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5" v-else>
      <OrderMenuItemCard
        v-for="menuItem in menuStore.menuItems"
        :key="menuItem.id"
        :menu-item="menuItem"
        @add-order-item="(menuItem) => $emit('addOrderItem', menuItem)"
      />
    </div>
  </div>
</template>
