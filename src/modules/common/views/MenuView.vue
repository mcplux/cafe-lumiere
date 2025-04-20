<script setup lang="ts">
import { useMenuStore } from '@/modules/menu/stores/menu.store'
import MenuList from '@/modules/menu/components/MenuList.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { onMounted } from 'vue'

const menuStore = useMenuStore()

onMounted(async () => {
  await menuStore.getMenuItems()
})
</script>

<template>
  <h1 class="text-3xl text-center font-bold">Menu</h1>

  <div v-if="menuStore.isSuccess">
    <p class="text-lg text-center mt-10 text-gray-700" v-if="menuStore.menuItems.length === 0">
      Menu is empty
    </p>

    <MenuList v-else :menuItems="menuStore.menuItems" />
  </div>

  <LoadingSpinner v-else-if="menuStore.isLoading" />

  <p
    class="text-lg text-center mt-10 text-white font-bold rounded bg-red-400 sm:w-1/2 mx-auto p-2"
    v-else-if="menuStore.isError"
  >
    Something went wrong while fetching menu
  </p>
</template>
