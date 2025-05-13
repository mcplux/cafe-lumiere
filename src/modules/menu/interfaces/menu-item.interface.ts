export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  createdAt: Date
  updatedAt: Date
  menuCategory: MenuCategory | null
}

export interface MenuCategory {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}
