<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { OrderItem } from '../interfaces'
import { useMenuStore } from '@/modules/menu/stores/menu.store'
import type { MenuItem } from '@/modules/menu/interfaces'
import { formatCurrency } from '@/modules/common/helpers'

interface Props {
  orderItem: OrderItem
}

const props = defineProps<Props>()

const menuStore = useMenuStore()

const menuItem = ref<MenuItem | null>(null)

onMounted(async () => {
  menuItem.value = await menuStore.getMenuItem(props.orderItem.menuItemId)
})
</script>

<template>
  <div class="relative border border-gray-200 p-2 flex flex-col sm:flex-row gap-3" v-if="menuItem">
    <button
      class="absolute -right-3 -top-3 bg-red-400 text-white rounded-full p-2"
      @click="() => console.log('Hello world!')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>

    <div class="w-full sm:w-64 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="w-full h-full object-cover object-center"
      />
    </div>

    <div>
      <p class="font-bold text-lg">{{ menuItem.name }}</p>
      <p>
        Price:
        <span class="font-bold"
          >{{ formatCurrency(menuItem.price) }} x {{ orderItem.quantity }}</span
        >
      </p>
      <div class="flex gap-2">
        <button class="bg-gray-200 px-2 rounded">-1</button>
        <button class="bg-gray-200 px-2 rounded">+1</button>
      </div>
      <p>
        Total:
        <span class="font-bold">{{ formatCurrency(menuItem.price * orderItem.quantity) }}</span>
      </p>
    </div>
  </div>
</template>
