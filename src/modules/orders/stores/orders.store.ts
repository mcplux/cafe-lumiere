import { computed, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { defineStore } from 'pinia'

import { getOrdersAction } from '../actions/get-orders.action'
import type { OrderItem, OrderResponse, SearchFilters } from '../interfaces'
import type { MenuItem } from '@/modules/menu/interfaces'
import { createOrderAction, deleteOrderAction, getOrderAction } from '../actions'
import { editOrderAction } from '../actions/edit-order.action'

enum OrderReqStatus {
  SUCCESS = 'success',
  LOADING = 'loading',
  ERROR = 'error',
}

const initialOrder: OrderResponse = {
  id: '',
  notes: '',
  client: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  orderItems: [],
  orderStatus: 'pending',
}

export const useOrdersStore = defineStore('orders', () => {
  const toast = useToast()

  const orders = ref<OrderResponse[]>([])
  const order = reactive<OrderResponse>({ ...initialOrder })
  const orderItems = ref<Omit<OrderItem, 'id'>[]>([])

  const orderReqStatus = ref<OrderReqStatus>(OrderReqStatus.LOADING)

  const searchFilters = reactive<SearchFilters>({
    pending: true,
    completed: true,
    paid: true,
    cancelled: false,
  })

  const resetState = () => {
    Object.assign(order, initialOrder)
    orderItems.value = []
  }

  const addOrderItem = (menuItem: MenuItem) => {
    const orderItem = orderItems.value.find((item) => item.menuItem.id === menuItem.id)

    if (orderItem) {
      increaseQuantity(menuItem.id)
      toast.success(`Item added successfully \n ${menuItem.name} x ${orderItem.quantity + 1}`)
    } else {
      orderItems.value.push({ menuItem, quantity: 1 })
      toast.success(`Item added successfully \n ${menuItem.name} x 1`)
    }
  }

  const removeOrderItem = (menuItemId: MenuItem['id']) => {
    orderItems.value = orderItems.value.filter((item) => item.menuItem.id !== menuItemId)
  }

  const increaseQuantity = (menuItemId: MenuItem['id']) => {
    orderItems.value = orderItems.value.map((item) => {
      return item.menuItem.id === menuItemId ? { ...item, quantity: item.quantity + 1 } : item
    })
  }

  const decreaseQuantity = (menuItemId: MenuItem['id']) => {
    const orderItem = orderItems.value.find((item) => item.menuItem.id === menuItemId)

    if (!orderItem) return

    if (orderItem.quantity <= 1) {
      return removeOrderItem(menuItemId)
    }

    orderItems.value = orderItems.value.map((item) => {
      return item.menuItem.id === menuItemId ? { ...item, quantity: item.quantity - 1 } : item
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

  const saveOrder = async () => {
    orderReqStatus.value = OrderReqStatus.LOADING

    const orderReq = {
      client: order.client,
      notes: order.notes,
      orderStatus: order.orderStatus,
      items: orderItems.value.map(({ menuItem, quantity }) => ({
        quantity,
        menuItemId: menuItem.id,
      })),
    }

    try {
      if (!order.id) {
        // New order
        await createOrderAction(orderReq)
      } else {
        // Update order
        await editOrderAction(order.id, orderReq)
      }

      resetState()
      orderReqStatus.value = OrderReqStatus.SUCCESS
    } catch {
      toast.error('Something went wrong')

      orderReqStatus.value = OrderReqStatus.ERROR
    }
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return

    orderReqStatus.value = OrderReqStatus.LOADING
    try {
      await deleteOrderAction(id)
      orderReqStatus.value = OrderReqStatus.SUCCESS
    } catch (error) {
      console.error(error)
      orderReqStatus.value = OrderReqStatus.ERROR
    }
  }

  return {
    orders,
    order,
    orderItems,
    searchFilters,
    resetState,
    addOrderItem,
    removeOrderItem,
    increaseQuantity,
    decreaseQuantity,
    getTodayOrders,
    getOrder,
    saveOrder,
    deleteOrder,
    isEmptyOrder: computed(() => orderItems.value.length === 0),
    isLoading: computed(() => orderReqStatus.value === OrderReqStatus.LOADING),
    isError: computed(() => orderReqStatus.value === OrderReqStatus.ERROR),
    isSuccess: computed(() => orderReqStatus.value === OrderReqStatus.SUCCESS),
  }
})
