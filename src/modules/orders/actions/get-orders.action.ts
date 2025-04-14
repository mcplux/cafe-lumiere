import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse } from '../interfaces/order.response'
import { formatLocalISOString } from '@/modules/common/helpers'

export const getOrdersAction = async (startDate: Date, endDate: Date) => {
  const url = `/orders?startDate=${formatLocalISOString(startDate)}&endDate=${formatLocalISOString(endDate)}`

  const { data } = await cafeLumiereApi.get<OrderResponse[]>(url)

  return data
}
