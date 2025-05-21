<script setup lang="ts">
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/16/solid'

const props = defineProps<{
  currentPage: number
  totalPages: number
  limit: number
  totalItems: number
}>()

defineEmits<{
  goToPage: [page: number]
}>()

const from = props.limit * (props.currentPage - 1) + 1
const to =
  props.limit * props.currentPage >= props.totalItems
    ? props.totalItems
    : props.limit * props.currentPage
</script>

<template>
  <div class="mt-10 flex items-center justify-between">
    <div>
      <p>{{ from }}-{{ to }} of {{ totalItems }}</p>
    </div>
    <div class="flex items-center gap-0.5 text-white">
      <button
        class="bg-orange-500 rounded-l hover:bg-orange-600 transition-colors disabled:hover:bg-orange-500 disabled:opacity-70"
        :disabled="currentPage === 1"
        @click="$emit('goToPage', 1)"
      >
        <ChevronDoubleLeftIcon class="size-8" />
      </button>
      <button
        class="bg-orange-500 hover:bg-orange-600 transition-colors disabled:hover:bg-orange-500 disabled:opacity-70"
        :disabled="currentPage === 1"
        @click="$emit('goToPage', currentPage - 1)"
      >
        <ChevronLeftIcon class="size-8" />
      </button>
      <p class="text-lg px-3 font-bold py-1 bg-orange-500 rounded-full mx-1 cursor-default">
        {{ currentPage }}
      </p>
      <button
        class="bg-orange-500 hover:bg-orange-600 transition-colors disabled:hover:bg-orange-500 disabled:opacity-70"
        :disabled="currentPage >= totalPages"
        @click="$emit('goToPage', currentPage + 1)"
      >
        <ChevronRightIcon class="size-8" />
      </button>
      <button
        class="bg-orange-500 rounded-r hover:bg-orange-600 transition-colors disabled:hover:bg-orange-500 disabled:opacity-70"
        :disabled="currentPage >= totalPages"
        @click="$emit('goToPage', totalPages)"
      >
        <ChevronDoubleRightIcon class="size-8" />
      </button>
    </div>
  </div>
</template>
