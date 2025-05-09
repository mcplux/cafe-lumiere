import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { SalesReport } from '../interface/sales-report.interface'
import { getSalesReportAction } from '../actions/get-sales-report.action'

export const useReportsStore = defineStore('reports', () => {
  const salesReport = ref<SalesReport | null>(null)

  const getLast30DaySalesReport = async () => {
    const now = new Date()

    const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30)
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999)

    salesReport.value = await getSalesReportAction(startDate, endDate)
  }

  return {
    salesReport,
    getLast30DaySalesReport,
  }
})
