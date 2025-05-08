<script setup lang="ts">
import TitlePage from '@/modules/common/components/TitlePage.vue'
import SaleSummaryCard from '../components/SaleSummaryCard.vue'
</script>

<template>
  <TitlePage title="Dashboard" />

  <div>
    <h2 class="text-lg font-bold">Sales Summary:</h2>
    <div class="flex gap-3 mt-5">
      <SaleSummaryCard title="Total Revenue" value="$365.00" :change="32" />
      <SaleSummaryCard title="Total Orders" value="45" :change="-5" />
      <SaleSummaryCard title="Total Revenue" value="$8.20" :change="-11" />
    </div>
  </div>
</template>
