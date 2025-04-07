<script setup lang="ts">
import { formatCurrency } from '@/modules/common/helpers'
import type { MenuItem } from '../interfaces/menu-item.interface'

interface Props {
  menuItem: MenuItem
}

defineProps<Props>()
</script>

<template>
  <div class="rounded p-3 flex flex-col sm:flex-row gap-3">
    <div class="w-full sm:w-1/2 h-64 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="w-full h-full object-cover object-center"
      />
    </div>
    <div class="w-full sm:w-1/2 flex flex-col justify-between py-5 gap-3">
      <div>
        <p class="uppercase font-bold mt-2">{{ menuItem.name }}</p>
        <p class="text-lg font-bold mt-2">{{ formatCurrency(menuItem.price) }}</p>
        <p class="mt-2 text-sm text-gray-700">
          {{ menuItem.description }}
        </p>
      </div>
    </div>
  </div>
</template>
