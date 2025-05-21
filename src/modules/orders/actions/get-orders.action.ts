import { isAxiosError } from 'axios'
import qs from 'qs'

import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { Order } from '../interfaces/order.interface'
import { formatLocalISOString } from '@/modules/common/helpers'
import type { SearchFilters } from '../interfaces'

interface QueryParams {
  limit: number
  offset: number
  startDate: string
  endDate: string
  orderStatus: string[]
}

type GetOrdersResponse =
  | {
      ok: true
      orders: Order[]
      totalItems: number
    }
  | {
      ok: false
      status: number
      msg: string
    }

const LIMIT = isNaN(+import.meta.env.VITE_LIMIT) ? 50 : +import.meta.env.VITE_LIMIT

export const getOrdersAction = async (
  startDate: Date,
  endDate: Date,
  searchFilters: SearchFilters,
  page: number = 1,
): Promise<GetOrdersResponse | never> => {
  const params: QueryParams = {
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
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

  try {
    const { data } = await cafeLumiereApi.get<{
      orders: Order[]
      totalItems: number
    }>('/orders', {
      params,
      paramsSerializer: () => qs.stringify(params, { arrayFormat: 'repeat' }),
    })

    return {
      ok: true,
      orders: data.orders,
      totalItems: data.totalItems,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 401) {
      return {
        ok: false,
        status: error.status,
        msg: 'Your session has expired',
      }
    }

    console.error(error)
    throw new Error('Something went wrong while fetching orders')
  }
}
