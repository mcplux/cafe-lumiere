import cafeLumiereApi from '@/api/cafe-lumiere.api'
import { isAxiosError } from 'axios'

type DeleteOrderResponse =
  | {
      ok: true
    }
  | {
      ok: false
      status: number
      msg: string
    }

export const deleteOrderAction = async (id: string): Promise<DeleteOrderResponse> => {
  try {
    await cafeLumiereApi.delete(`/orders/${id}`)

    return {
      ok: true,
    }
  } catch (error) {
    if (isAxiosError(error) && (error.status === 400 || error.status === 404)) {
      return {
        ok: false,
        status: error.status,
        msg: 'Item not found',
      }
    }

    console.error(error)
    throw new Error('Something went wrong while deleting an order')
  }
}
