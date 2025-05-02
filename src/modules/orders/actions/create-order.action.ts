import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse, OrderStatus } from '../interfaces'

interface NewOrder {
  client: string
  notes: string | null
  items: { menuItemId: string; quantity: number }[]
  orderStatus?: OrderStatus
}

type CreateOrderResponse =
  | {
      ok: true
      order: OrderResponse
    }
  | {
      ok: false
      code: number
      msg: string
    }

export const createOrderAction = async (order: NewOrder): Promise<CreateOrderResponse> => {
  try {
    const { data } = await cafeLumiereApi.post<OrderResponse>('/orders', order)

    return {
      ok: true,
      order: data,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong while creating order')
  }
}
