<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import OrderItemPreviewCard from './OrderItemPreviewCard.vue'
import { formatCurrency } from '@/modules/common/helpers'
import { useOrdersStore } from '../stores/orders.store'
import type { CreateOrder } from '../interfaces'

const orderStatus = ['pending', 'completed', 'paid', 'cancelled']

const toast = useToast()
const router = useRouter()

const ordersStore = useOrdersStore()

const handleNewOrder = async () => {
  if (ordersStore.order.client === '') {
    toast.error("The client's name is required")
    return
  }

  if (ordersStore.isEmptyOrder) {
    toast.error('The order must have at least one item')
    return
  }
  const { id, ...data } = ordersStore.order

  const order: CreateOrder = {
    ...data,
    items: ordersStore.orderItems.map((item) => ({
      menuItemId: item.menuItem.id,
      quantity: item.quantity,
    })),
  }

  const [ok, msg] = await ordersStore.saveOrder(id || null, order)
  if (ok) {
    toast.success(msg)
    router.push({ name: 'orders' })
  } else {
    toast.error(msg)
  }
}
</script>

<template>
  <form class="mt-10" @submit.prevent="handleNewOrder">
    <h2 class="text-2xl font-bold">Order Preview</h2>

    <div class="mt-5">
      <h3 class="font-bold text-lg">Client Details</h3>

      <div class="mt-2 flex flex-col gap-3 border-b border-gray-200 pb-10">
        <div class="flex flex-col gap-1">
          <label for="name">Client's Name</label>
          <input
            type="text"
            id="name"
            class="border border-gray-700 rounded p-1"
            v-model="ordersStore.order.client"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="order_status">Order Status</label>
          <select
            id="order_status"
            class="border border-gray-700 rounded p-1 uppercase"
            v-model="ordersStore.order.orderStatus"
          >
            <option v-for="status in orderStatus" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label for="notes">Aditional Notes</label>
          <textarea
            id="notes"
            class="border border-gray-700 rounded p-1"
            v-model="ordersStore.order.notes"
          />
        </div>
      </div>
    </div>

    <div class="mt-5">
      <h3 class="font-bold text-lg">Order Items</h3>

      <p v-if="ordersStore.isEmptyOrder" class="text-gray-700 text-lg text-center mt-5">
        The order is empty
      </p>

      <div v-else>
        <div class="flex flex-col gap-3 mt-5">
          <OrderItemPreviewCard
            v-for="orderItem in ordersStore.orderItems"
            :key="orderItem.menuItem.id"
            :order-item="orderItem"
            @remove-order-item="(menuItemId) => ordersStore.removeOrderItem(menuItemId)"
            @increase-quantity="(menuItemId) => ordersStore.increaseQuantity(menuItemId)"
            @decrease-quantity="(menuItemId) => ordersStore.decreaseQuantity(menuItemId)"
          />
        </div>

        <p class="text-lg text-right mt-5">
          Total: <span class="font-bold">{{ formatCurrency(ordersStore.orderTotal) }}</span>
        </p>
      </div>
    </div>
    <div class="mt-5">
      <button
        class="text-white bg-orange-400 px-3 py-2 rounded w-full disabled:opacity-50"
        type="submit"
        :disabled="ordersStore.isLoading"
      >
        {{ ordersStore.isLoading ? 'Loading...' : 'Save Order' }}
      </button>
    </div>
  </form>
</template>
