import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

import { getOrdersAction } from '../actions/get-orders.action'
import type { OrderResponse } from '../interfaces/order.response'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<OrderResponse[]>([])

  const getTodayOrders = async () => {
    const now = new Date()

    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

    orders.value = await getOrdersAction(startDate, endDate)
  }

  onMounted(() => {
    getTodayOrders()
  })

  return {
    orders,
  }
})
