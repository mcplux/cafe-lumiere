import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { MenuItem } from '../interfaces/menu-item.interface'
import { isAxiosError } from 'axios'

type GetMenuItemResponse =
  | {
      ok: true
      menuItem: MenuItem
    }
  | {
      ok: false
      status: number
      msg: string
    }

export const getMenuItemAction = async (id: string): Promise<GetMenuItemResponse> => {
  try {
    const { data } = await cafeLumiereApi.get<MenuItem>(`/menu/${id}`)

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
    throw new Error('Something went wrong while getting an item')
  }
}
