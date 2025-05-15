import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { Order } from '../interfaces'
import { isAxiosError } from 'axios'

type GetOrderResponse =
  | {
      ok: true
      order: Order
    }
  | {
      ok: false
      status: number
      msg: string
    }

export const getOrderAction = async (id: Order['id']): Promise<GetOrderResponse> => {
  try {
    const { data } = await cafeLumiereApi.get<Order>(`/orders/${id}`)

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
    throw new Error('Something went wrong while fetching the order')
  }
}
