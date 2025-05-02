import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse } from '../interfaces'
import { isAxiosError } from 'axios'

type GetOrderResponse =
  | {
      ok: true
      order: OrderResponse
    }
  | {
      ok: false
      code: number
      msg: string
    }

export const getOrderAction = async (id: OrderResponse['id']): Promise<GetOrderResponse> => {
  try {
    const { data } = await cafeLumiereApi.get<OrderResponse>(`/orders/${id}`)

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
    throw new Error('Something went wrong while fetching the order')
  }
}
