<script setup lang="ts">
import OrderList from '@/modules/orders/components/OrderList.vue'
import { useOrdersStore } from '@/modules/orders/stores/orders.store'

const ordersStore = useOrdersStore()
</script>

<template>
  <h1 class="text-3xl text-center font-bold">Orders</h1>

  <OrderList :orders="ordersStore.orders" />
</template>
