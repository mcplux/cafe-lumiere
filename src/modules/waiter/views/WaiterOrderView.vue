<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import type { OrderResponse } from '@/modules/orders/interfaces'
import { useOrdersStore } from '@/modules/orders/stores/orders.store'
import { formatCurrency, formatDate, getOrderTotalAmount } from '@/modules/common/helpers'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const ordersStore = useOrdersStore()

const id = route.params.id as string
const order = ref<OrderResponse | null>(null)

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this order?')) return

  await ordersStore.deleteOrder(id)
  if (ordersStore.isSuccess) {
    toast.success('Order deleted successfully')
    router.replace({ name: 'waiter-orders' })
  }
}

onMounted(async () => {
  order.value = (await ordersStore.getOrder(id)) ?? null
})
</script>

<template>
  <h1 class="text-3xl text-center font-bold">Order - {{ id.substring(0, 8) }}</h1>

  <div class="flex justify-end">
    <RouterLink
      :to="{ name: 'waiter-orders' }"
      class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5 text-center"
    >
      Back to Orders
    </RouterLink>
  </div>

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
              <span class="font-bold">
                {{ formatCurrency(item.menuItem.price * item.quantity) }}
              </span>
            </p>
          </div>
        </li>
      </ul>
      <p class="mt-5 text-lg text-right">
        Total: <span class="font-bold">{{ getOrderTotalAmount(order) }}</span>
      </p>
    </div>

    <div class="mt-5 flex gap-3">
      <button class="w-full p-2 text-white bg-red-600 rounded" @click="() => handleDelete(id)">
        Cancel Order
      </button>
      <RouterLink
        :to="{ name: 'waiter-edit-order', params: { id: order.id } }"
        class="w-full p-2 text-white bg-gray-600 rounded text-center"
      >
        Edit Order
      </RouterLink>
    </div>
  </div>
</template>
