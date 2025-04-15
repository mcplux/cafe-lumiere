<script setup lang="ts">
import OrderList from '@/modules/orders/components/OrderList.vue'
import { useOrdersStore } from '@/modules/orders/stores/orders.store'

const ordersStore = useOrdersStore()
</script>

<template>
  <h1 class="text-3xl text-center font-bold">Orders</h1>

  <div class="flex justify-end">
    <RouterLink
      :to="{ name: 'waiter-new-order' }"
      class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5"
    >
      New Order
    </RouterLink>
  </div>

  <OrderList :orders="ordersStore.orders" />
</template>
