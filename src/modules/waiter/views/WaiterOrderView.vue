<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import type { OrderResponse } from '@/modules/orders/interfaces'
import { useOrdersStore } from '@/modules/orders/stores/orders.store'
import { formatCurrency, formatDate, getOrderTotalAmount } from '@/modules/common/helpers'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'

const route = useRoute()
const ordersStore = useOrdersStore()

const id = route.params.id as string
const order = ref<OrderResponse | null>(null)

onMounted(async () => {
  order.value = (await ordersStore.getOrder(id)) ?? null
})
</script>

<template>
  <h1 class="text-3xl text-center font-bold">Order - {{ id.substring(0, 8) }}</h1>

  <LoadingSpinner v-if="ordersStore.isLoading" />

  <div v-if="ordersStore.isSuccess && order" class="mt-10">
    <div class="flex flex-col gap-3 border border-gray-700 rounded p-5">
      <p class="text-lg">
        ID: <span class="font-bold">{{ order.id }}</span>
      </p>
      <p class="text-lg">
        Client: <span class="font-bold">{{ order.client }}</span>
      </p>
      <p class="text-lg">
        Date: <span class="font-bold">{{ formatDate(order.createdAt) }}</span>
      </p>

      <p class="text-lg">
        Status: <span class="font-bold">{{ order.orderStatus.toUpperCase() }}</span>
      </p>

      <p class="text-lg">
        Total: <span class="font-bold">{{ getOrderTotalAmount(order) }}</span>
      </p>

      <p class="text-lg">
        Aditional Notes: <span class="font-bold">{{ order.notes ?? '' }}</span>
      </p>
    </div>

    <div class="mt-5 border border-gray-700 rounded p-5">
      <h3 class="text-lg font-bold">Items:</h3>

      <ul class="flex flex-col gap-3">
        <li
          v-for="item in order.orderItems"
          :key="item.id"
          class="flex flex-col sm:flex-row gap-3 p-5 border-b border-gray-700"
        >
          <div class="w-full sm:w-64 h-40 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="w-full h-full object-cover object-center"
            />
          </div>
          <div>
            <p class="text-lg font-bold">{{ item.menuItem.name }}</p>
            <p>
              Price: <span class="font-bold">{{ formatCurrency(item.menuItem.price) }}</span>
            </p>
            <p>
              Quantity: <span class="font-bold">{{ item.quantity }}</span>
            </p>
            <p>
              Subtotal:
              <span class="font-bold">{{
                formatCurrency(item.menuItem.price * item.quantity)
              }}</span>
            </p>
          </div>
        </li>
      </ul>
      <p class="mt-5 text-lg text-right">
        Total: <span class="font-bold">{{ getOrderTotalAmount(order) }}</span>
      </p>
    </div>

    <div class="mt-5 flex gap-3">
      <button class="w-full p-2 text-white bg-red-600 rounded">Cancel Order</button>
      <button class="w-full p-2 text-white bg-green-600 rounded">Mark as Completed</button>
      <button class="w-full p-2 text-white bg-gray-600 rounded">Edit Order</button>
    </div>
  </div>
</template>
