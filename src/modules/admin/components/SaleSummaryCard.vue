<script setup lang="ts">
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/vue/16/solid'

defineProps<{
  title: string
  value: string
  change: number
}>()
</script>

<template>
  <div class="border border-gray-700 p-5 rounded w-1/3 flex flex-col gap-1 shadow-md">
    <p class="text-gray-600 text-sm">{{ title }}:</p>
    <p class="text-xl font-bold">{{ value }}</p>
    <p
      class="flex items-center gap-0.5 text-xs"
      :class="change > 0 ? 'text-green-600' : 'text-red-600'"
    >
      <ChevronDoubleUpIcon v-if="change > 0" class="size-4" />
      <ChevronDoubleDownIcon v-else class="size-4" />
      {{ change > 0 ? 'Increased' : 'Decreased' }} by {{ change }}%
    </p>
  </div>
</template>
