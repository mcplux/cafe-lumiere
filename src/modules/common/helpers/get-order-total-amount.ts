import type { OrderResponse } from '@/modules/orders/interfaces/order.response'
import { formatCurrency } from './format-currency'

export const getOrderTotalAmount = (order: OrderResponse): string => {
  const totalAmount = order.orderItems.reduce(
    (total, item) => total + item.menuItem.price * item.quantity,
    0,
  )

  return formatCurrency(totalAmount)
}
