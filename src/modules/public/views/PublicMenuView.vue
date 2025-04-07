<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { getMenuItemsAction } from '@/modules/menu/actions/get-menu-items.action'
import type { MenuItem } from '@/modules/menu/interfaces/menu-item.interface'
import MenuList from '../../menu/components/MenuList.vue'

const menuItems = ref<MenuItem[]>([])

onMounted(async () => {
  menuItems.value = await getMenuItemsAction()
})
</script>

<template>
  <h1 class="text-4xl text-center font-bold uppercase">Menu</h1>

  <MenuList :menuItems="menuItems" />
</template>
