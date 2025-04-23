import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse, OrderStatus } from '../interfaces'

interface NewOrder {
  client: string
  notes: string | null
  items: { menuItemId: string; quantity: number }[]
  orderStatus?: OrderStatus
}

export const createOrderAction = async (order: NewOrder) => {
  const { data } = await cafeLumiereApi.post<OrderResponse>('/orders', order)

  return data
}
