import { isAxiosError } from 'axios'

import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { Order, CreateOrder } from '../interfaces'

type UpdateOrderResponse =
  | {
      ok: true
      order: Order
    }
  | {
      ok: false
      status: number
      msg: string
    }

export const updateOrderAction = async (
  id: Order['id'],
  order: CreateOrder,
): Promise<UpdateOrderResponse> => {
  try {
    const { data } = await cafeLumiereApi.patch<Order>(`/orders/${id}`, order)

    return {
      ok: true,
      order: data,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 400) {
      return {
        ok: false,
        status: error.status,
        msg: 'Order not found',
      }
    }

    if (isAxiosError(error) && error.status === 401) {
      return {
        ok: false,
        status: error.status,
        msg: 'Your session has expired',
      }
    }

    if (isAxiosError(error) && error.status === 404) {
      return {
        ok: false,
        status: error.status,
        msg: 'Order not found',
      }
    }

    console.error(error)
    throw new Error('Something went wrong while editing order')
  }
}
