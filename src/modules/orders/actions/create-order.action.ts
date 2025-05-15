import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { CreateOrder, Order } from '../interfaces'

type CreateOrderResponse =
  | {
      ok: true
      order: Order
    }
  | {
      ok: false
      code: number
      msg: string
    }

export const createOrderAction = async (order: CreateOrder): Promise<CreateOrderResponse> => {
  try {
    const { data } = await cafeLumiereApi.post<Order>('/orders', order)

    return {
      ok: true,
      order: data,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong while creating order')
  }
}
