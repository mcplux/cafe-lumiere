import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

import { getOrdersAction } from '../actions/get-orders.action'
import type { OrderItem, OrderResponse, SearchFilters } from '../interfaces'
import type { MenuItem } from '@/modules/menu/interfaces'
import { createOrderAction, getOrderAction } from '../actions'
import { useToast } from 'vue-toastification'

enum OrderReqStatus {
  SUCCESS = 'success',
  LOADING = 'loading',
  ERROR = 'error',
}

export const useOrdersStore = defineStore('orders', () => {
  const router = useRouter()
  const toast = useToast()

  const orders = ref<OrderResponse[]>([])
  const orderItems = ref<OrderItem[]>([])

  const orderReqStatus = ref<OrderReqStatus>(OrderReqStatus.LOADING)

  const searchFilters = reactive<SearchFilters>({
    pending: true,
    completed: true,
    paid: true,
    cancelled: false,
  })

  const addOrderItem = (menuItemId: MenuItem['id']) => {
    const orderItem = orderItems.value.find((item) => item.menuItemId === menuItemId)

    if (orderItem) {
      increaseQuantity(menuItemId)
    } else {
      orderItems.value.push({ menuItemId, quantity: 1 })
    }

    toast.success('Item added successfully')
  }

  const removeOrderItem = (menuItemId: MenuItem['id']) => {
    orderItems.value = orderItems.value.filter((item) => item.menuItemId !== menuItemId)
  }

  const increaseQuantity = (menuItemId: MenuItem['id']) => {
    orderItems.value = orderItems.value.map((item) => {
      return item.menuItemId === menuItemId ? { ...item, quantity: item.quantity + 1 } : item
    })
  }

  const decreaseQuantity = (menuItemId: MenuItem['id']) => {
    const orderItem = orderItems.value.find((item) => item.menuItemId === menuItemId)

    if (!orderItem) return

    if (orderItem.quantity <= 1) {
      return removeOrderItem(menuItemId)
    }

    orderItems.value = orderItems.value.map((item) => {
      return item.menuItemId === menuItemId ? { ...item, quantity: item.quantity - 1 } : item
    })
  }

  // Database actions
  const getTodayOrders = async () => {
    orderReqStatus.value = OrderReqStatus.LOADING

    const now = new Date()

    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

    try {
      orders.value = await getOrdersAction(startDate, endDate, searchFilters)
      orderReqStatus.value = OrderReqStatus.SUCCESS
    } catch {
      orderReqStatus.value = OrderReqStatus.ERROR
    }
  }

  const getOrder = async (id: OrderResponse['id']) => {
    orderReqStatus.value = OrderReqStatus.LOADING

    try {
      const order = await getOrderAction(id)
      orderReqStatus.value = OrderReqStatus.SUCCESS
      return order
    } catch {
      orderReqStatus.value = OrderReqStatus.ERROR
    }
  }

  const addNewOrder = async (client: string, notes: string) => {
    orderReqStatus.value = OrderReqStatus.LOADING

    const newOrder = {
      client,
      notes,
      items: orderItems.value,
    }

    try {
      await createOrderAction(newOrder)
      orderReqStatus.value = OrderReqStatus.SUCCESS

      toast.success('Order created succefully')
      setTimeout(() => {
        router.push({ name: 'waiter-orders' })
      }, 500)
    } catch {
      toast.error('Something went wrong')

      orderReqStatus.value = OrderReqStatus.ERROR
    }
  }

  return {
    orders,
    orderItems,
    searchFilters,
    addOrderItem,
    removeOrderItem,
    increaseQuantity,
    decreaseQuantity,
    getTodayOrders,
    getOrder,
    addNewOrder,
    isEmptyOrder: computed(() => orderItems.value.length === 0),
    isLoading: computed(() => orderReqStatus.value === OrderReqStatus.LOADING),
    isError: computed(() => orderReqStatus.value === OrderReqStatus.ERROR),
    isSuccess: computed(() => orderReqStatus.value === OrderReqStatus.SUCCESS),
  }
})
