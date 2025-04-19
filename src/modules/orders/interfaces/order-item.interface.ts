import type { MenuItem } from '@/modules/menu/interfaces'

export interface OrderItem {
  menuItemId: MenuItem['id']
  quantity: number
}
