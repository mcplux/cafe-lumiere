<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useToast } from 'vue-toastification'

import { useOrdersStore } from '@/modules/orders/stores/orders.store'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { formatLocalISOString } from '@/modules/common/helpers'
import OrderStatusCheck from './OrderStatusCheck.vue'

const toast = useToast()

const ordersStore = useOrdersStore()
const authStore = useAuthStore()

const dates = reactive({
  startDate: '',
  endDate: '',
})

const handleChangeDate = async (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  const id = (e.target as HTMLInputElement).id

  const offset = new Date().getTimezoneOffset() / 60
  const [year, month, day] = value.split('-').map(Number)

  const utcDate = new Date(Date.UTC(year, month - 1, day, offset, 0, 0))

  if (id === 'startDate') {
    dates.startDate = value
    ordersStore.dates.startDate = new Date(
      utcDate.getFullYear(),
      utcDate.getMonth(),
      utcDate.getDate(),
    )
  } else if (id === 'endDate') {
    dates.startDate = value
    ordersStore.dates.startDate = new Date(
      utcDate.getFullYear(),
      utcDate.getMonth(),
      utcDate.getDate(),
      23,
      59,
      59,
    )
  } else {
    return
  }

  const [ok, msg] = await ordersStore.getOrders()
  if (!ok) {
    toast.error(msg)
  }
}

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

onMounted(() => {
  const startDate = formatLocalISOString(ordersStore.dates.startDate).split('T')[0]
  const endDate = formatLocalISOString(ordersStore.dates.endDate).split('T')[0]

  Object.assign(dates, { startDate, endDate })
})
</script>

<template>
  <div>
    <div class="mt-5" v-if="authStore.isAdmin">
      <h3 class="font-bold">Dates:</h3>
      <div class="flex flex-col gap-3 sm:flex-row justify-between mt-2">
        <div class="flex flex-col w-full sm:w-1/2 gap-1">
          <label for="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            class="border border-gray-700 rounded px-2 py-1"
            :value="dates.startDate"
            @change="handleChangeDate"
          />
        </div>
        <div class="flex flex-col w-full sm:w-1/2 gap-1">
          <label for="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            class="border border-gray-700 rounded px-2 py-1"
            :value="dates.endDate"
            @change="handleChangeDate"
          />
        </div>
      </div>
    </div>
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
  </div>
</template>
