<script setup lang="ts">
import { useOrdersStore } from '@/modules/orders/stores/orders.store'

const ordersStore = useOrdersStore()
</script>

<template>
  <h1 class="text-3xl text-center font-bold">Orders</h1>

  <!-- Filters -->

  <!-- Orders -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-14 gap-3">
    <div
      class="bg-gray-200 rounded p-3 cursor-pointer hover:scale-105 transition-all"
      v-for="order in ordersStore.orders"
      :key="order.id"
    >
      <p class="text-xs text-gray-700 font-light text-right">{{ order.id.substring(0, 8) }}</p>
      <p class="text-sm text-gray-700">{{ order.createdAt }}</p>
      <p class="uppercase font-bold">{{ order.client }}</p>
      <p class="text-lg font-bold">$45.00</p>
      <p class="text-xs uppercase bg-yellow-200 text-yellow-600 text-center">In progress</p>
    </div>
  </div>
</template>
