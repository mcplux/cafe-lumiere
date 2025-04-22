import qs from 'qs'

import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse } from '../interfaces/order.response'
import { formatLocalISOString } from '@/modules/common/helpers'
import type { SearchFilters } from '../interfaces'

interface QueryParams {
  startDate: string
  endDate: string
  orderStatus: string[]
}

export const getOrdersAction = async (
  startDate: Date,
  endDate: Date,
  searchFilters: SearchFilters,
) => {
  const params: QueryParams = {
    startDate: formatLocalISOString(startDate),
    endDate: formatLocalISOString(endDate),
    orderStatus: [],
  }

  if (searchFilters.pending) {
    params.orderStatus.push('pending')
  }

  if (searchFilters.completed) {
    params.orderStatus.push('completed')
  }

  if (searchFilters.paid) {
    params.orderStatus.push('paid')
  }

  if (searchFilters.cancelled) {
    params.orderStatus.push('cancelled')
  }

  const { data } = await cafeLumiereApi.get<OrderResponse[]>('/orders', {
    params,
    paramsSerializer: () => qs.stringify(params, { arrayFormat: 'repeat' }),
  })

  return data
}
