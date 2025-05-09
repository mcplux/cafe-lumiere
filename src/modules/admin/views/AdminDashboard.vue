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

  <div class="mt-10">
    <h2 class="text-lg font-bold">Sales Summary:</h2>
    <div class="flex flex-col sm:flex-row gap-3 mt-5">
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
    <div class="flex flex-col md:flex-row gap-3 mt-5">
      <div class="border border-gray-700 p-5 rounded md:w-1/3 shadow-md">
        <h3 class="text-lg font-semibold">Best Items:</h3>
        <ul class="mt-3 divide-y divide-gray-700">
          <li
            v-for="item in reportsStore.salesReport?.bestItems"
            :key="item.name"
            class="py-2 flex justify-between items-center"
          >
            <p>{{ item.name }}</p>
            <p class="text-lg font-semibold">{{ item.quantity }}</p>
          </li>
        </ul>

        <button class="bg-orange-400 text-white w-full mt-3 rounded py-1">See Menu</button>
      </div>

      <div class="w-2/3">Card</div>
    </div>
  </div>
</template>
