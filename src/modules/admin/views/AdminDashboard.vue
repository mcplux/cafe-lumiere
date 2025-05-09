<script setup lang="ts">
import { onMounted } from 'vue'
import TitlePage from '@/modules/common/components/TitlePage.vue'
import SaleSummaryCard from '../components/SaleSummaryCard.vue'
import { formatCurrency } from '@/modules/common/helpers'
import { useReportsStore } from '@/modules/reports/stores/reports.store'

const reportsStore = useReportsStore()

onMounted(async () => {
  reportsStore.getLast30DaySalesReport()
})
</script>

<template>
  <TitlePage title="Dashboard" />

  <div>
    <h2 class="text-lg font-bold">Sales Summary:</h2>
    <div class="flex gap-3 mt-5">
      <SaleSummaryCard
        title="Total Revenue"
        :value="formatCurrency(reportsStore.salesReport?.totalRevenue ?? 0)"
        :change="32"
      />
      <SaleSummaryCard
        title="Order Count"
        :value="reportsStore.salesReport?.orderCount.toString() ?? ''"
        :change="-5"
      />
      <SaleSummaryCard
        title="Total Revenue"
        :value="formatCurrency(reportsStore.salesReport?.averageOrder ?? 0)"
        :change="-11"
      />
    </div>
  </div>
</template>
