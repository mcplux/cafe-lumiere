<script setup lang="ts">
import { onMounted } from 'vue'
import { useMenuStore } from '../stores/menu.store'
import TitlePage from '@/modules/common/components/TitlePage.vue'
import MenuManagementItem from '../components/MenuManagementItem.vue'

const menuStore = useMenuStore()

onMounted(async () => {
  await menuStore.getMenuItems()
})
</script>

<template>
  <TitlePage title="Menu Management" />

  <div v-if="menuStore.isSuccess" class="px-5">
    <div class="flex justify-end">
      <RouterLink
        :to="{ name: 'new-menu-item' }"
        class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5 text-center"
      >
        Add New Item
      </RouterLink>
    </div>

    <div class="mt-5">
      <p class="text-lg text-center mt-10 text-gray-700" v-if="menuStore.isEmpty">Menu is empty</p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <MenuManagementItem v-for="item in menuStore.menuItems" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>
