import { computed, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { defineStore } from 'pinia'

import { getOrdersAction } from '../actions/get-orders.action'
import {
  OrderStatus,
  type OrderItem,
  type Order,
  type SearchFilters,
  type CreateOrder,
} from '../interfaces'
import { createOrderAction, deleteOrderAction, getOrderAction, updateOrderAction } from '../actions'
import type { MenuItem } from '@/modules/menu/interfaces'

enum OrderReqStatus {
  SUCCESS = 'success',
  LOADING = 'loading',
  ERROR = 'error',
}

const initialOrder = {
  id: '',
  notes: '',
  client: '',
  orderStatus: OrderStatus.PENDING,
}

export const useOrdersStore = defineStore('orders', () => {
  const toast = useToast()

  const orders = ref<Order[]>([])
  const order = reactive({ ...initialOrder })
  const orderItems = ref<Omit<OrderItem, 'id'>[]>([])

  const orderReqStatus = ref<OrderReqStatus>(OrderReqStatus.SUCCESS)

  const dates = reactive({
    startDate: new Date(),
    endDate: new Date(),
  })

  const searchFilters = reactive<SearchFilters>({
    pending: true,
    completed: true,
    paid: false,
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
  const getOrders = async (): Promise<[boolean, string]> => {
    orderReqStatus.value = OrderReqStatus.LOADING
    try {
      const response = await getOrdersAction(dates.startDate, dates.endDate, searchFilters)
      if (!response.ok) {
        orderReqStatus.value = OrderReqStatus.ERROR
        return [false, response.msg]
      }

      orderReqStatus.value = OrderReqStatus.SUCCESS
      orders.value = response.orders
      return [true, '']
    } catch (error) {
      if (error instanceof Error) {
        orderReqStatus.value = OrderReqStatus.ERROR

        return [false, error.message]
      }

      orderReqStatus.value = OrderReqStatus.ERROR
      return [false, 'Something went wrong while fetching orders']
    }
  }

  const getOrder = async (id: Order['id']): Promise<[boolean, Order | null, string]> => {
    orderReqStatus.value = OrderReqStatus.LOADING

    try {
      const response = await getOrderAction(id)
      if (!response.ok) {
        return [false, null, response.msg]
      }

      orderReqStatus.value = OrderReqStatus.SUCCESS
      return [true, response.order, '']
    } catch (error) {
      if (error instanceof Error) {
        orderReqStatus.value = OrderReqStatus.ERROR

        return [false, null, error.message]
      }

      orderReqStatus.value = OrderReqStatus.ERROR
      return [false, null, 'Something went wrong while fetching order']
    }
  }

  const saveOrder = async (id: string | null, order: CreateOrder): Promise<[boolean, string]> => {
    if (id) {
      return await updateOrder(id, order)
    } else {
      return await createOrder(order)
    }
  }

  const deleteOrder = async (id: string): Promise<[boolean, string]> => {
    orderReqStatus.value = OrderReqStatus.LOADING
    try {
      const response = await deleteOrderAction(id)
      if (!response.ok) {
        orderReqStatus.value = OrderReqStatus.ERROR
        return [false, response.msg]
      }

      orderReqStatus.value = OrderReqStatus.SUCCESS
      return [true, 'Order deleted successfully']
    } catch (error) {
      if (error instanceof Error) {
        orderReqStatus.value = OrderReqStatus.ERROR

        return [false, error.message]
      }

      orderReqStatus.value = OrderReqStatus.ERROR
      return [false, 'Something went wrong while deleting the order']
    }
  }

  const createOrder = async (order: CreateOrder): Promise<[boolean, string]> => {
    orderReqStatus.value = OrderReqStatus.LOADING
    try {
      const response = await createOrderAction(order)
      if (!response.ok) {
        orderReqStatus.value = OrderReqStatus.ERROR
        return [false, response.msg]
      }
      orderReqStatus.value = OrderReqStatus.SUCCESS
      resetState()
      return [true, 'Order created successfully']
    } catch (error) {
      if (error instanceof Error) {
        orderReqStatus.value = OrderReqStatus.ERROR

        return [false, error.message]
      }

      orderReqStatus.value = OrderReqStatus.ERROR
      return [false, 'Something went wrong while creating an order']
    } finally {
      resetState()
    }
  }

  const updateOrder = async (id: Order['id'], order: CreateOrder): Promise<[boolean, string]> => {
    orderReqStatus.value = OrderReqStatus.LOADING
    try {
      const response = await updateOrderAction(id, order)
      if (!response.ok) {
        orderReqStatus.value = OrderReqStatus.ERROR
        return [false, response.msg]
      }

      return [true, 'Order updated successfully']
    } catch (error) {
      if (error instanceof Error) {
        orderReqStatus.value = OrderReqStatus.ERROR

        return [false, error.message]
      }

      orderReqStatus.value = OrderReqStatus.ERROR
      return [false, 'Something went wrong while editing the order']
    } finally {
      resetState()
    }
  }

  const orderTotal = computed(() =>
    orderItems.value.reduce((total, orderItem) => {
      return orderItem.quantity * orderItem.menuItem.price + total
    }, 0),
  )

  return {
    orders,
    order,
    orderItems,
    dates,
    searchFilters,
    resetState,
    addOrderItem,
    removeOrderItem,
    increaseQuantity,
    decreaseQuantity,
    getOrders,
    getOrder,
    saveOrder,
    deleteOrder,
    isEmptyOrder: computed(() => orderItems.value.length === 0),
    isLoading: computed(() => orderReqStatus.value === OrderReqStatus.LOADING),
    isError: computed(() => orderReqStatus.value === OrderReqStatus.ERROR),
    isSuccess: computed(() => orderReqStatus.value === OrderReqStatus.SUCCESS),
    noOrders: computed(() => orders.value.length === 0),
    orderTotal,
  }
})
