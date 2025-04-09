import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

import { getMenuItemsAction } from '../actions/get-menu-items.action'
import { MenuStatus, type MenuItem } from '../interfaces'

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref<MenuItem[]>([])
  const menuStatus = ref<MenuStatus>(MenuStatus.LOADING)

  const getMenuItems = async () => {
    try {
      menuStatus.value = MenuStatus.LOADING
      menuItems.value = await getMenuItemsAction()
      menuStatus.value = MenuStatus.SUCCESS
    } catch (error) {
      console.log(error)
      menuStatus.value = MenuStatus.ERROR
    }
  }

  onMounted(async () => {
    await getMenuItems()
  })

  return {
    menuItems,
    menuStatus,
  }
})
