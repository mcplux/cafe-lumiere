<script setup lang="ts">
import { onMounted } from 'vue'
import { useMenuStore } from '../stores/menu.store'
import TitlePage from '@/modules/common/components/TitlePage.vue'

const menuStore = useMenuStore()

onMounted(async () => {
  await menuStore.getMenuItems()
})
</script>

<template>
  <TitlePage title="Menu Management" />

  <div v-if="menuStore.isSuccess" class="px-5">
    <div class="flex justify-end">
      <button
        class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5 text-center"
      >
        Add New Item
      </button>
    </div>

    <div class="mt-5">
      <p class="text-lg text-center mt-10 text-gray-700" v-if="menuStore.menuItems.length === 0">
        Menu is empty
      </p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="item in menuStore.menuItems" :key="item.id" class="border border-gray-700 p-2">
          <div class="h-64 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="w-full h-full object-cover object-center"
            />
          </div>
          <h3 class="text-lg font-bold">{{ item.name }}</h3>
          <div class="mt-2">
            <button class="w-full p-1 text-white rounded bg-blue-600">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
