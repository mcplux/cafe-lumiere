import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse } from '../interfaces'

export const getOrderAction = async (id: OrderResponse['id']) => {
  const { data } = await cafeLumiereApi.get<OrderResponse>(`/orders/${id}`)

  return data
}
