<script setup lang="ts">
import { useMenuStore } from '@/modules/menu/stores/menu.store'
import MenuList from '../../menu/components/MenuList.vue'
import { MenuStatus } from '@/modules/menu/interfaces'
import LoadingSpinner from '@/modules/common/components/LoadingSpinner.vue'

const menuStore = useMenuStore()
</script>

<template>
  <h1 class="text-3xl text-center font-bold">Menu</h1>

  <div v-if="menuStore.menuStatus === MenuStatus.SUCCESS">
    <p class="text-lg text-center mt-10 text-gray-700" v-if="menuStore.menuItems.length === 0">
      Menu is empty
    </p>

    <MenuList v-else :menuItems="menuStore.menuItems" />
  </div>

  <LoadingSpinner v-else-if="menuStore.menuStatus === MenuStatus.LOADING" />
  <p
    class="text-lg text-center mt-10 text-white font-bold rounded bg-red-400 sm:w-1/2 mx-auto p-2"
    v-else-if="menuStore.menuStatus === MenuStatus.ERROR"
  >
    Something went wrong while fetching menu
  </p>
</template>
