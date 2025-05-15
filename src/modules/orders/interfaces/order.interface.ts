import type { MenuItem } from '@/modules/menu/interfaces'

export interface Order {
  id: string
  client: string
  notes: null | string
  orderStatus: OrderStatus
  total: number
  createdAt: Date
  updatedAt: Date
  orderItems: OrderItem[]
}

export interface OrderItem {
  id: string
  menuItem: MenuItem
  quantity: number
}

export enum OrderStatus {
  COMPLETED = 'completed',
  PAID = 'paid',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}
