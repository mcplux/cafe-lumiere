import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

import { getOrdersAction } from '../actions/get-orders.action'
import type { OrderResponse } from '../interfaces/order.response'
import type { MenuItem } from '@/modules/menu/interfaces'

interface OrderItem {
  menuItem: MenuItem
  quantity: number
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<OrderResponse[]>([])
  const orderItems = ref<OrderItem[]>([])

  const addOrderItem = (menuItem: MenuItem) => {
    const orderItem = orderItems.value.find((item) => item.menuItem.id === menuItem.id)

    if (orderItem) {
      orderItems.value = orderItems.value.map((item) => {
        return item.menuItem.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
      })
    } else {
      orderItems.value.push({ menuItem, quantity: 1 })
    }

    console.log(orderItems.value)
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
