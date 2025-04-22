<script setup lang="ts">
import OrderList from '@/modules/orders/components/OrderList.vue'
import { useOrdersStore } from '@/modules/orders/stores/orders.store'
import { onMounted } from 'vue'

const ordersStore = useOrdersStore()

onMounted(() => {
  ordersStore.getTodayOrders()
})
</script>

<template>
  <h1 class="text-3xl text-center font-bold">Orders</h1>
  <div class="flex justify-end">
    <RouterLink
      :to="{ name: 'waiter-new-order' }"
      class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5"
    >
      New Order
    </RouterLink>
  </div>

  <!-- Filters -->
  <div>
    <h3 class="font-bold">Order Status:</h3>
    <div class="flex flex-col sm:flex-row justify-between mt-2">
      <div class="flex gap-2 items-center">
        <input
          type="checkbox"
          id="pending"
          v-model="ordersStore.searchFilters.pending"
          @change="ordersStore.getTodayOrders"
        />
        <label for="pending">Pending</label>
      </div>
      <div class="flex gap-2 items-center">
        <input
          type="checkbox"
          id="completed"
          v-model="ordersStore.searchFilters.completed"
          @change="ordersStore.getTodayOrders"
        />
        <label for="completed">Completed</label>
      </div>
      <div class="flex gap-2 items-center">
        <input
          type="checkbox"
          name="paid"
          id="paid"
          v-model="ordersStore.searchFilters.paid"
          @change="ordersStore.getTodayOrders"
        />
        <label for="paid">Paid</label>
      </div>
      <div class="flex gap-2 items-center">
        <input
          type="checkbox"
          id="cancelled"
          v-model="ordersStore.searchFilters.cancelled"
          @change="ordersStore.getTodayOrders"
        />
        <label for="cancelled">Cancelled</label>
      </div>
    </div>
  </div>

  <OrderList :orders="ordersStore.orders" />
</template>
