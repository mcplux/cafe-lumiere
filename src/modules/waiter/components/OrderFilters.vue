<script setup lang="ts">
import { useOrdersStore } from '@/modules/orders/stores/orders.store'

const ordersStore = useOrdersStore()
</script>

<template>
  <div class="mt-5">
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
</template>
