<script setup lang="ts">
import { useOrdersStore } from '@/modules/orders/stores/orders.store'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'
import OrderList from '@/modules/orders/components/OrderList.vue'
import { onMounted } from 'vue'
import OrderFilters from '../components/OrderFilters.vue'
import TitlePage from '@/modules/common/components/TitlePage.vue'

const ordersStore = useOrdersStore()

onMounted(() => {
  ordersStore.getTodayOrders()
})
</script>

<template>
  <TitlePage title="Orders" />

  <div class="flex justify-end">
    <RouterLink
      :to="{ name: 'waiter-new-order' }"
      class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5 text-center"
    >
      New Order
    </RouterLink>
  </div>

  <OrderFilters />

  <LoadingSpinner v-if="ordersStore.isLoading" />

  <div v-else>
    <p v-if="ordersStore.orders.length === 0" class="text-center mt-10 text-gray-700 text-lg">
      No orders yet
    </p>

    <OrderList v-else :orders="ordersStore.orders" />
  </div>
</template>
