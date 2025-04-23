import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse } from '../interfaces'

interface EditOrder {
  client?: string
  notes?: string | null
  items?: { menuItemId: string; quantity: number }[]
}

export const editOrderAction = async (id: OrderResponse['id'], order: EditOrder) => {
  const { data } = await cafeLumiereApi.patch<OrderResponse>(`/orders/${id}`, order)

  return data
}
