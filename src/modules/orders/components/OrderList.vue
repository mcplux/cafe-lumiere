<script setup lang="ts">
import type { OrderResponse } from '../interfaces/order.response'
import OrderCard from './OrderCard.vue'

interface Props {
  orders: OrderResponse[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 gap-3">
    <OrderCard v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>
