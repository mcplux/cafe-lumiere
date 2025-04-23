<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import type { OrderResponse } from '@/modules/orders/interfaces'
import { useOrdersStore } from '@/modules/orders/stores/orders.store'

const route = useRoute()
const ordersStore = useOrdersStore()

const id = route.params.id as string
const order = ref<OrderResponse | null>(null)

onMounted(async () => {
  order.value = await ordersStore.getOrder(id)
})
</script>

<template>
  <h1 class="text-3xl text-center font-bold">Order {{ id.substring(0, 8) }}</h1>

  <pre>{{ order }}</pre>
</template>
