import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { MenuItem, NewMenuItem } from '../interfaces'
import { isAxiosError } from 'axios'

type CreateMenuItemResponse =
  | {
      ok: true
      menuItem: MenuItem
    }
  | {
      ok: false
      status: number
      msg: string
    }

export const createMenuItemAction = async (
  newItem: NewMenuItem,
): Promise<CreateMenuItemResponse> => {
  try {
    const { data } = await cafeLumiereApi.post<MenuItem>('/menu', newItem)

    return {
      ok: true,
      menuItem: data,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 400) {
      return {
        ok: false,
        status: error.status,
        msg: error.response?.data.message,
      }
    }

    throw new Error('Something went wrong while creating new menu item')
  }
}
