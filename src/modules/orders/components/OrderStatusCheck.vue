<script setup lang="ts">
defineProps<{
  id: string
  value: boolean
}>()

defineEmits<{
  change: [e: Event]
}>()
</script>

<template>
  <div class="flex gap-2 items-center">
    <input type="checkbox" :id="id" :checked="value" @change="(e) => $emit('change', e)" />
    <label :for="id">{{ id }}</label>
  </div>
</template>
