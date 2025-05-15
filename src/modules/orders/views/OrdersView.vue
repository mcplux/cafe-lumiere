<script setup lang="ts">
import { onMounted } from 'vue'
import { useToast } from 'vue-toastification'

import { useOrdersStore } from '../stores/orders.store'
import TitlePage from '@/modules/common/components/TitlePage.vue'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'
import OrderCard from '../components/OrderCard.vue'

const ordersStore = useOrdersStore()
const toast = useToast()

onMounted(async () => {
  const now = new Date()

  const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

  const [ok, msg] = await ordersStore.getOrders(startDate, endDate)
  if (!ok) {
    toast.error(msg)
  }
})
</script>

<template>
  <TitlePage title="Orders" />

  <div v-if="ordersStore.isSuccess">
    <div class="flex justify-end">
      <RouterLink
        :to="{ name: 'new-order' }"
        class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5 text-center"
      >
        Add Order
      </RouterLink>
    </div>

    <p v-if="ordersStore.noOrders" class="text-center mt-10 text-gray-700 text-lg">No orders yet</p>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10 gap-3">
      <OrderCard v-for="order in ordersStore.orders" :key="order.id" :order="order" />
    </div>
  </div>

  <LoadingSpinner v-if="ordersStore.isLoading" />
</template>
