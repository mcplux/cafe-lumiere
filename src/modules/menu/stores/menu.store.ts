import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { getMenuItemsAction, getMenuItemAction } from '../actions'
import { MenuStatus, type MenuItem, type NewMenuItem } from '../interfaces'
import { createMenuItemAction } from '../actions/create-menu-item.action'

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref<MenuItem[]>([])
  const menuStatus = ref<MenuStatus>(MenuStatus.SUCCESS)

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

  const createMenuItem = async (newItem: NewMenuItem): Promise<[boolean, string]> => {
    try {
      const response = await createMenuItemAction(newItem)
      if (!response.ok) {
        return [false, response.msg]
      }

      return [true, 'Menu Item created successfuly']
    } catch (error) {
      if (error instanceof Error) {
        return [false, error.message]
      }

      return [false, 'Something went wrong']
    }
  }

  return {
    menuItems,
    menuStatus,
    getMenuItems,
    getMenuItem,
    createMenuItem,
    isSuccess: computed(() => menuStatus.value === MenuStatus.SUCCESS),
    isLoading: computed(() => menuStatus.value === MenuStatus.LOADING),
    isError: computed(() => menuStatus.value === MenuStatus.ERROR),
    isEmpty: computed(() => menuItems.value.length === 0),
  }
})
