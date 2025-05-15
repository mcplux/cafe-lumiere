<script lang="ts" setup>
import { formatCurrency } from '@/modules/common/helpers'
import type { Order } from '../interfaces/order.interface'
import { formatDate } from '@/modules/common/helpers/format-date'

interface Props {
  order: Order
}

defineProps<Props>()

const orderStatusColors = {
  pending: 'text-yellow-600 bg-yellow-200',
  completed: 'text-green-600 bg-green-200',
  paid: 'text-blue-600 bg-blue-200',
  cancelled: 'text-red-600 bg-red-200',
}
</script>

<template>
  <RouterLink
    :to="{ name: 'order', params: { id: order.id } }"
    class="border border-gray-700 flex flex-col gap-2 rounded p-3 cursor-pointer hover:scale-105 transition-all shadow"
  >
    <p class="text-xs text-gray-700 font-light">{{ order.id.substring(0, 8) }}</p>
    <p class="text-xs uppercase text-center p-1" :class="orderStatusColors[order.orderStatus]">
      {{ order.orderStatus }}
    </p>
    <p class="text-sm text-gray-700">{{ formatDate(order.createdAt) }}</p>
    <p class="uppercase font-bold">{{ order.client }}</p>
    <p class="text-lg font-bold">{{ formatCurrency(order.total) }}</p>
  </RouterLink>
</template>
