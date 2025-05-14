import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  getMenuItemsAction,
  getMenuItemAction,
  createMenuItemAction,
  updateMenuItemAction,
  deleteMenuItemAction,
} from '../actions'
import { MenuStatus, type MenuItem, type CreateMenuItem } from '../interfaces'

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref<MenuItem[]>([])
  const menuStatus = ref<MenuStatus>(MenuStatus.SUCCESS)

  const getMenuItems = async () => {
    menuStatus.value = MenuStatus.LOADING
    try {
      menuItems.value = await getMenuItemsAction()
      menuStatus.value = MenuStatus.SUCCESS
    } catch (error) {
      console.log(error)
      menuStatus.value = MenuStatus.ERROR
    }
  }

  const getMenuItem = async (id: string): Promise<[false, null, string] | [true, MenuItem]> => {
    try {
      menuStatus.value = MenuStatus.LOADING
      const response = await getMenuItemAction(id)

      if (!response.ok) {
        menuStatus.value = MenuStatus.ERROR
        return [false, null, response.msg]
      }

      menuStatus.value = MenuStatus.SUCCESS
      return [true, response.menuItem]
    } catch (error) {
      if (error instanceof Error) {
        return [false, null, error.message]
      }

      return [false, null, 'Something went wrong while getting an item']
    }
  }

  const saveMenuItem = async (item: CreateMenuItem, id?: string): Promise<[boolean, string]> => {
    if (id) {
      return await updateMenuItem(id, item)
    } else {
      return await createMenuItem(item)
    }
  }

  const deleteMenuItem = async (id: string): Promise<[boolean, string]> => {
    try {
      const response = await deleteMenuItemAction(id)
      if (!response.ok) {
        return [false, response.msg]
      }

      return [true, 'Menu Item deleted successfully']
    } catch (error) {
      if (error instanceof Error) {
        return [false, error.message]
      }

      return [false, 'Something went wrong while deleting an item']
    }
  }

  const createMenuItem = async (newItem: CreateMenuItem): Promise<[boolean, string]> => {
    try {
      const response = await createMenuItemAction(newItem)
      if (!response.ok) {
        return [false, response.msg]
      }

      return [true, 'Item created successfuly']
    } catch (error) {
      if (error instanceof Error) {
        return [false, error.message]
      }

      return [false, 'Something went wrong while creating a menu item']
    }
  }

  const updateMenuItem = async (
    id: string,
    updatedItem: CreateMenuItem,
  ): Promise<[boolean, string]> => {
    try {
      const response = await updateMenuItemAction(id, updatedItem)
      if (!response.ok) {
        return [false, response.msg]
      }

      return [true, 'Item updated successfullty']
    } catch (error) {
      if (error instanceof Error) {
        return [false, error.message]
      }

      return [false, 'Something went wrong while updating a menu item']
    }
  }

  return {
    menuItems,
    menuStatus,
    getMenuItems,
    getMenuItem,
    saveMenuItem,
    deleteMenuItem,
    isSuccess: computed(() => menuStatus.value === MenuStatus.SUCCESS),
    isLoading: computed(() => menuStatus.value === MenuStatus.LOADING),
    isError: computed(() => menuStatus.value === MenuStatus.ERROR),
    isEmpty: computed(() => menuItems.value.length === 0),
  }
})
