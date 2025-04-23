import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse } from '../interfaces'

interface NewOrder {
  client: string
  notes: string | null
  items: { menuItemId: string; quantity: number }[]
}

export const createOrderAction = async (order: NewOrder) => {
  const { data } = await cafeLumiereApi.post<OrderResponse>('/orders', order)

  return data
}
