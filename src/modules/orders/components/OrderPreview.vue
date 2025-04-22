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
    <h2 class="text-2xl font-bold">Order Preview</h2>

    <div class="mt-5">
      <h3 class="font-bold text-lg">Client Details</h3>
      <div class="mt-2 flex flex-col gap-3 border-b border-gray-200 pb-10">
        <div class="flex flex-col gap-1">
          <label for="name">Client's Name</label>
          <input type="text" id="name" class="border border-gray-700 rounded p-1" />
        </div>

        <div class="flex flex-col gap-1">
          <label for="name">Aditional Notes</label>
          <textarea id="name" class="border border-gray-700 rounded p-1" />
        </div>
      </div>
    </div>

    <div class="mt-5">
      <h3 class="font-bold text-lg">Order Items</h3>

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
      </div>
    </div>
    <div class="mt-5">
      <button class="text-white bg-orange-400 px-3 py-2 rounded w-full">Add Order</button>
    </div>
  </div>
</template>
