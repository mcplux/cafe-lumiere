<script setup lang="ts">
import type { OrderItem } from '../interfaces'
import type { MenuItem } from '@/modules/menu/interfaces'
import { formatCurrency } from '@/modules/common/helpers'
import { XMarkIcon } from '@heroicons/vue/16/solid'

interface Props {
  orderItem: Omit<OrderItem, 'id'>
}

defineProps<Props>()

defineEmits<{
  removeOrderItem: [menuItemId: MenuItem['id']]
  increaseQuantity: [menuItemId: MenuItem['id']]
  decreaseQuantity: [menuItemId: MenuItem['id']]
}>()
</script>

<template>
  <div class="relative border border-gray-200 p-2 flex flex-col sm:flex-row gap-3">
    <button
      class="absolute -right-3 -top-3 bg-red-400 text-white rounded-full p-2"
      @click="$emit('removeOrderItem', orderItem.menuItem.id)"
    >
      <XMarkIcon class="size-6" />
    </button>

    <div class="w-full sm:w-64 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="w-full h-full object-cover object-center"
      />
    </div>

    <div>
      <p class="font-bold text-lg">{{ orderItem.menuItem.name }}</p>
      <p>
        Price:
        <span class="font-bold"
          >{{ formatCurrency(orderItem.menuItem.price) }} x {{ orderItem.quantity }}</span
        >
      </p>
      <div class="flex gap-2">
        <button
          class="bg-gray-200 px-2 rounded"
          @click="$emit('decreaseQuantity', orderItem.menuItem.id)"
          type="button"
        >
          -1
        </button>
        <button
          class="bg-gray-200 px-2 rounded"
          @click="$emit('increaseQuantity', orderItem.menuItem.id)"
          type="button"
        >
          +1
        </button>
      </div>
      <p>
        Total:
        <span class="font-bold">
          {{ formatCurrency(orderItem.menuItem.price * orderItem.quantity) }}
        </span>
      </p>
    </div>
  </div>
</template>
