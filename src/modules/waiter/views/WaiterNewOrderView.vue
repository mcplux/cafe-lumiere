<script setup lang="ts">
import { formatCurrency } from '@/modules/common/helpers'
import { useMenuStore } from '@/modules/menu/stores/menu.store'

const menuStore = useMenuStore()
</script>

<template>
  <h1 class="text-3xl text-center font-bold">New Order</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
    <div
      v-for="item in menuStore.menuItems"
      :key="item.id"
      class="relative border border-gray-200 p-2"
    >
      <button
        class="absolute -right-3 -top-3 bg-orange-400 text-white rounded-full p-2"
        @click="console.log('Hello world!')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <div class="w-full h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <p class="text-lg font-bold">{{ item.name }}</p>
      <p class="text-lg font-bold">{{ formatCurrency(item.price) }}</p>
    </div>
  </div>
</template>
