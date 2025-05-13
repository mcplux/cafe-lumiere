<script setup lang="ts">
import TitlePage from '@/modules/common/components/TitlePage.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id as string
console.log(id)
</script>

<template>
  <TitlePage title="Edit Item" />
</template>
