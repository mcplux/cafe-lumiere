import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { MenuItem } from '../interfaces/menu-item.interface'

export const getMenuItemAction = async (id: string) => {
  const { data } = await cafeLumiereApi.get<MenuItem>(`/menu/${id}`)

  return data
}
