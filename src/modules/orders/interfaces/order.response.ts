import type { MenuItem } from '@/modules/menu/interfaces'

export interface OrderResponse {
  id: string
  client: string
  notes: null | string
  createdAt: Date
  updatedAt: Date
  orderItems: OrderItem[]
}

interface OrderItem {
  id: string
  menuItem: MenuItem
  quantity: number
}
