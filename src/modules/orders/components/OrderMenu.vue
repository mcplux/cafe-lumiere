<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import OrderMenuItemCard from './OrderMenuItemCard.vue'
import type { MenuItem } from '@/modules/menu/interfaces'
import { useMenuStore } from '@/modules/menu/stores/menu.store'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'

defineEmits<{
  addOrderItem: [menuItem: MenuItem]
}>()

const menuStore = useMenuStore()
const filteredItems = ref<MenuItem[]>([])

const filterInput = ref('')

const resetFilter = () => {
  filterInput.value = ''
}

onMounted(async () => {
  await menuStore.getMenuItems()
  filteredItems.value = menuStore.menuItems
})

watch(filterInput, () => {
  filteredItems.value = menuStore.menuItems.filter((item) => {
    const word = item.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    const filter = filterInput.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    return word.includes(filter)
  })
})
</script>

<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold">Menu</h2>

    <LoadingSpinner v-if="menuStore.isLoading" />

    <div class="mt-5" v-else>
      <div class="flex flex-col gap-2">
        <label for="filter-orders">Search Item:</label>
        <div class="flex gap-2">
          <input
            type="text"
            id="filter-orders"
            class="border border-gray-700 w-full px-2 py-1.5 rounded"
            placeholder="e.g. cappuccino"
            v-model="filterInput"
          />
          <button
            type="button"
            class="py-1.5 px-2 bg-orange-400 text-white rounded"
            @click="resetFilter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
        <OrderMenuItemCard
          v-for="menuItem in filteredItems"
          :key="menuItem.id"
          :menu-item="menuItem"
          @add-order-item="(menuItem) => $emit('addOrderItem', menuItem)"
        />
      </div>
    </div>
  </div>
</template>
