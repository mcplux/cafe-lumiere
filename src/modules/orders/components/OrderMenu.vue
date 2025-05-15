<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { XMarkIcon } from '@heroicons/vue/16/solid'

import { useOrdersStore } from '../stores/orders.store'
import type { MenuItem } from '@/modules/menu/interfaces'
import { useMenuStore } from '@/modules/menu/stores/menu.store'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'
import OrderMenuItemCard from './OrderMenuItemCard.vue'

defineEmits<{
  addOrderItem: [menuItem: MenuItem]
}>()

const menuStore = useMenuStore()
const ordersStore = useOrdersStore()

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
      .replace(' ', '')

    const filter = filterInput.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(' ', '')

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
            <XMarkIcon class="size-6" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
        <OrderMenuItemCard
          v-for="menuItem in filteredItems"
          :key="menuItem.id"
          :menu-item="menuItem"
          @add-order-item="(menuItem) => ordersStore.addOrderItem(menuItem)"
        />
      </div>
    </div>
  </div>
</template>
