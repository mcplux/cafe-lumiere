import { isAxiosError } from 'axios'

import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse, OrderStatus } from '../interfaces'

interface EditOrder {
  client?: string
  notes?: string | null
  items?: { menuItemId: string; quantity: number }[]
  orderStatus?: OrderStatus
}

type EditOrderResponse =
  | {
      ok: true
      order: OrderResponse
    }
  | {
      ok: false
      code: number
      msg: string
    }

export const editOrderAction = async (
  id: OrderResponse['id'],
  order: EditOrder,
): Promise<EditOrderResponse> => {
  try {
    const { data } = await cafeLumiereApi.patch<OrderResponse>(`/orders/${id}`, order)

    return {
      ok: true,
      order: data,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 400) {
      return {
        ok: false,
        code: error.status,
        msg: 'Order not found',
      }
    }

    if (isAxiosError(error) && error.status === 401) {
      return {
        ok: false,
        code: error.status,
        msg: 'Your session has expired',
      }
    }

    if (isAxiosError(error) && error.status === 404) {
      return {
        ok: false,
        code: error.status,
        msg: 'Order not found',
      }
    }
    console.error(error)
    throw new Error('Something went wrong while editing order')
  }
}
