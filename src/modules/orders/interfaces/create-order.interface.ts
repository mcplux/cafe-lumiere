import type { MenuItem } from '@/modules/menu/interfaces'
import type { OrderStatus } from './order.interface'

export interface CreateOrder {
  client: string
  notes?: string
  orderStatus: OrderStatus
  items: CreateOrderItems[]
}

export interface CreateOrderItems {
  menuItemId: MenuItem['id']
  quantity: number
}
