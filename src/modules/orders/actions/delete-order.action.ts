import cafeLumiereApi from '@/api/cafe-lumiere.api'

type DeleteOrderResponse =
  | {
      ok: true
    }
  | {
      ok: false
      code: number
      msg: string
    }

export const deleteOrderAction = async (id: string): Promise<DeleteOrderResponse> => {
  try {
    await cafeLumiereApi.delete(`/orders/${id}`)

    return {
      ok: true,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong while deleting order')
  }
}
