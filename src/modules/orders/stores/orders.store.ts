import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

import { getOrdersAction } from '../actions/get-orders.action'
import type { MenuItem } from '@/modules/menu/interfaces'
import type { OrderItem, OrderResponse } from '../interfaces'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<OrderResponse[]>([])
  const orderItems = ref<OrderItem[]>([])

  const addOrderItem = (menuItemId: MenuItem['id']) => {
    const orderItem = orderItems.value.find((item) => item.menuItemId === menuItemId)

    if (orderItem) {
      orderItems.value = orderItems.value.map((item) => {
        return item.menuItemId === menuItemId ? { ...item, quantity: item.quantity + 1 } : item
      })
    } else {
      orderItems.value.push({ menuItemId, quantity: 1 })
    }
  }

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
    orderItems,
    addOrderItem,
  }
})
