import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { SalesReport } from '../interface/sales-report.interface'
import { formatLocalISOString } from '@/modules/common/helpers'

interface QueryParams {
  startDate: string
  endDate: string
}

export const getSalesReportAction = async (startDate: Date, endDate: Date) => {
  const params: QueryParams = {
    startDate: formatLocalISOString(startDate),
    endDate: formatLocalISOString(endDate),
  }

  const { data } = await cafeLumiereApi.get<SalesReport>('reports/sales', { params })

  return data
}
