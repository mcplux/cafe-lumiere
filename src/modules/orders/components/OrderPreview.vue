<script setup lang="ts">
import type { OrderItem } from '../interfaces'
import OrderItemPreviewCard from './OrderItemPreviewCard.vue'
import { formatCurrency } from '@/modules/common/helpers'
import type { MenuItem } from '@/modules/menu/interfaces'

defineProps<{
  isEmptyOrder: boolean
  orderItems: OrderItem[]
  orderTotal: number
}>()

defineEmits<{
  removeOrderItem: [menuItemId: MenuItem['id']]
  increaseQuantity: [menuItemId: MenuItem['id']]
  decreaseQuantity: [menuItemId: MenuItem['id']]
}>()
</script>

<template>
  <div class="mt-10">
    <h2 class="text-xl font-bold">Order Preview</h2>

    <p v-if="isEmptyOrder" class="text-gray-700 text-lg text-center mt-5">The order is empty</p>

    <div v-else>
      <div class="flex flex-col gap-3 mt-5">
        <OrderItemPreviewCard
          v-for="orderItem in orderItems"
          :key="orderItem.menuItemId"
          :order-item="orderItem"
          @remove-order-item="(menuItemId) => $emit('removeOrderItem', menuItemId)"
          @increase-quantity="(menuItemId) => $emit('increaseQuantity', menuItemId)"
          @decrease-quantity="(menuItemId) => $emit('decreaseQuantity', menuItemId)"
        />
      </div>

      <p class="text-lg text-right mt-5">
        Total: <span class="font-bold">{{ formatCurrency(orderTotal) }}</span>
      </p>

      <div class="flex justify-end mt-5">
        <button class="text-white bg-orange-400 px-3 py-2 rounded w-full sm:w-auto">
          Add Order
        </button>
      </div>
    </div>
  </div>
</template>
