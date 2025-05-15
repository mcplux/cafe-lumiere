<script setup lang="ts">
import TitlePage from '@/modules/common/components/TitlePage.vue'
</script>

<template>
  <TitlePage title="Orders" />

  <div class="flex justify-end">
    <RouterLink
      :to="{ name: 'new-order' }"
      class="bg-orange-500 p-2 rounded text-white font-bold w-full sm:w-auto mt-5 text-center"
    >
      Add Order
    </RouterLink>
  </div>
</template>
