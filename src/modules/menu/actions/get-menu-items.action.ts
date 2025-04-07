import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { MenuItem } from '../interfaces/menu-item.interface'

export const getMenuItemsAction = async () => {
  const { data } = await cafeLumiereApi.get<MenuItem[]>('/menu')

  return data
}
