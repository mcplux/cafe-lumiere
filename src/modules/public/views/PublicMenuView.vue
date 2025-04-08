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
  <h1 class="text-3xl text-center font-bold">Menu</h1>

  <p class="text-lg text-center mt-10 text-gray-700" v-if="menuItems.length === 0">Menu is empty</p>
  <MenuList v-else :menuItems="menuItems" />
</template>
