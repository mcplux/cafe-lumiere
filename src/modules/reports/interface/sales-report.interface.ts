export interface SalesReport {
  totalRevenue: number
  orderCount: number
  averageOrder: number
  bestItems: BestItem[]
}

export interface BestItem {
  name: string
  quantity: number
}
