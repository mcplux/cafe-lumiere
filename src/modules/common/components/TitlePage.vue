<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h1 class="text-3xl text-center font-bold">{{ title }}</h1>
</template>
