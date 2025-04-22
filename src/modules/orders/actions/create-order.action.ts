import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderItem, OrderResponse } from '../interfaces'

interface NewOrder {
  client: string
  notes: string
  items: OrderItem[]
}

export const createOrderAction = async (order: NewOrder) => {
  const { data } = await cafeLumiereApi.post<OrderResponse>('/orders', order)

  return data
}
