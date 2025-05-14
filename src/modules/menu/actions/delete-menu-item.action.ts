import { isAxiosError } from 'axios'

import cafeLumiereApi from '@/api/cafe-lumiere.api'

type DeleteMenuItemResponse =
  | {
      ok: true
    }
  | {
      ok: false
      status: number
      msg: string
    }

export const deleteMenuItemAction = async (id: string): Promise<DeleteMenuItemResponse> => {
  try {
    await cafeLumiereApi.delete(`/menu/${id}`)

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
    throw new Error('Something went wrong while deleting a menu item')
  }
}
