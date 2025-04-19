import { computed, onMounted, ref } from 'vue'
import { defineStore } from 'pinia'

import { getMenuItemsAction } from '../actions/get-menu-items.action'
import { MenuStatus, type MenuItem } from '../interfaces'
import { getMenuItemAction } from '../actions/get-menu-item.action'

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

  const getMenuItem = async (id: string) => {
    try {
      menuStatus.value = MenuStatus.LOADING
      const menuItem = await getMenuItemAction(id)
      menuStatus.value = MenuStatus.SUCCESS

      return menuItem
    } catch (error) {
      console.log(error)
      menuStatus.value = MenuStatus.ERROR

      return null
    }
  }

  onMounted(async () => {
    await getMenuItems()
  })

  return {
    menuItems,
    menuStatus,
    getMenuItem,
    isSuccess: computed(() => menuStatus.value === MenuStatus.SUCCESS),
    isLoading: computed(() => menuStatus.value === MenuStatus.LOADING),
    isError: computed(() => menuStatus.value === MenuStatus.ERROR),
  }
})
