<script lang="ts" setup>
import { getOrderTotalAmount } from '@/modules/common/helpers'
import type { OrderResponse } from '../interfaces/order.response'
import { formatDate } from '@/modules/common/helpers/format-date'

interface Props {
  order: OrderResponse
}

defineProps<Props>()
</script>

<template>
  <div class="bg-gray-200 rounded p-3 cursor-pointer hover:scale-105 transition-all">
    <p class="text-xs text-gray-700 font-light text-right">{{ order.id.substring(0, 8) }}</p>
    <p class="text-sm text-gray-700">{{ formatDate(order.createdAt) }}</p>
    <p class="uppercase font-bold">{{ order.client }}</p>
    <p class="text-lg font-bold">{{ getOrderTotalAmount(order) }}</p>
    <!-- <p class="text-xs uppercase bg-yellow-200 text-yellow-600 text-center">In progress</p> -->
  </div>
</template>
