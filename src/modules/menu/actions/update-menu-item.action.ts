import { isAxiosError } from 'axios'

import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { MenuItem, CreateMenuItem } from '../interfaces'

type UpdateMenuItemResponse =
  | {
      ok: true
      menuItem: MenuItem
    }
  | {
      ok: false
      status: number
      msg: string
    }

export const updateMenuItemAction = async (
  id: string,
  updatedItem: Partial<CreateMenuItem>,
): Promise<UpdateMenuItemResponse> => {
  try {
    const { data } = await cafeLumiereApi.patch<MenuItem>(`/menu/${id}`, updatedItem)

    return {
      ok: true,
      menuItem: data,
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
    throw new Error('Something went wrong while updating item')
  }
}
