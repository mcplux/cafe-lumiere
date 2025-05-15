import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { Order, OrderStatus } from '../interfaces'

interface NewOrder {
  client: string
  notes: string | null
  items: { menuItemId: string; quantity: number }[]
  orderStatus?: OrderStatus
}

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

export const createOrderAction = async (order: NewOrder): Promise<CreateOrderResponse> => {
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
