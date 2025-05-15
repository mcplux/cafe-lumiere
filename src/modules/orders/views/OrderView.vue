<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import TitlePage from '@/modules/common/components/TitlePage.vue'
import { useOrdersStore } from '../stores/orders.store'
import type { Order } from '../interfaces'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'
import { formatCurrency, formatDate } from '@/modules/common/helpers'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const ordersStore = useOrdersStore()

const id = route.params.id as string
const order = ref<Order | null>(null)

const handleDelete = async () => {
  if (!order.value || !confirm('Are you sure you want to delete this order?')) return

  const [ok, msg] = await ordersStore.deleteOrder(order.value.id)

  if (ok) {
    toast.success(msg)
  } else {
    toast.error(msg)
  }

  router.replace({ name: 'orders' })
}

onMounted(async () => {
  const [ok, orderReq, msg] = await ordersStore.getOrder(id)

  if (!ok) {
    toast.error(msg)
    return router.replace({ name: 'orders' })
  }

  order.value = orderReq
})
</script>

<template>
  <TitlePage :title="`Order - ${id.substring(0, 8)}`" />

  <div class="flex justify-end">
    <RouterLink
      :to="{ name: 'orders' }"
      class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5 text-center"
    >
      Back to Orders
    </RouterLink>
  </div>

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
        Total: <span class="font-bold">{{ formatCurrency(order.total) }}</span>
      </p>

      <p class="text-lg">
        Aditional Notes: <span class="font-bold">{{ order.notes || '-' }}</span>
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
        Total: <span class="font-bold">{{ formatCurrency(order.total) }}</span>
      </p>
    </div>

    <div class="mt-5 flex gap-3">
      <button class="w-full p-2 text-white bg-red-600 rounded" @click="handleDelete">
        Delete Order
      </button>
      <RouterLink
        :to="{ name: 'edit-order', params: { id: order.id } }"
        class="w-full p-2 text-white bg-gray-600 rounded text-center"
      >
        Edit Order
      </RouterLink>
    </div>
  </div>

  <LoadingSpinner v-if="ordersStore.isLoading" />
</template>
