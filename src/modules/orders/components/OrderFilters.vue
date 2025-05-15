<script setup lang="ts">
import { useToast } from 'vue-toastification'

import { useOrdersStore } from '@/modules/orders/stores/orders.store'
import OrderStatusCheck from './OrderStatusCheck.vue'

const ordersStore = useOrdersStore()
const toast = useToast()

const handleChangeCheckBox = async (e: Event) => {
  const filter = (e.target as HTMLInputElement).id.toLowerCase()
  const value = (e.target as HTMLInputElement).checked

  const isValidFilter =
    filter === 'pending' || filter === 'completed' || filter === 'paid' || filter === 'cancelled'

  if (!isValidFilter) {
    return
  }
  ordersStore.searchFilters[filter] = value

  const [ok, msg] = await ordersStore.getOrders()
  if (!ok) {
    toast.error(msg)
  }
}
</script>

<template>
  <div class="mt-5">
    <h3 class="font-bold">Order Status:</h3>
    <div class="flex flex-col sm:flex-row justify-between mt-2">
      <OrderStatusCheck
        :value="ordersStore.searchFilters.pending"
        id="Pending"
        @change="handleChangeCheckBox"
      />
      <OrderStatusCheck
        :value="ordersStore.searchFilters.completed"
        id="Completed"
        @change="handleChangeCheckBox"
      />
      <OrderStatusCheck
        :value="ordersStore.searchFilters.paid"
        id="Paid"
        @change="handleChangeCheckBox"
      />
      <OrderStatusCheck
        :value="ordersStore.searchFilters.cancelled"
        id="Cancelled"
        @change="handleChangeCheckBox"
      />
    </div>
  </div>
</template>
