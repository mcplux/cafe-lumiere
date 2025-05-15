import qs from 'qs'

import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { OrderResponse } from '../interfaces/order.interface'
import { formatLocalISOString } from '@/modules/common/helpers'
import type { SearchFilters } from '../interfaces'
import { isAxiosError } from 'axios'

interface QueryParams {
  startDate: string
  endDate: string
  orderStatus: string[]
}

type GetOrdersResponse =
  | {
      ok: true
      orders: OrderResponse[]
    }
  | {
      ok: false
      msg: string
    }

export const getOrdersAction = async (
  startDate: Date,
  endDate: Date,
  searchFilters: SearchFilters,
): Promise<GetOrdersResponse | never> => {
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

  try {
    const { data } = await cafeLumiereApi.get<OrderResponse[]>('/orders', {
      params,
      paramsSerializer: () => qs.stringify(params, { arrayFormat: 'repeat' }),
    })

    return {
      ok: true,
      orders: data,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 401) {
      return {
        ok: false,
        msg: 'Your session has expired',
      }
    }

    console.error(error)
    throw new Error('Something went wrong while fetching orders')
  }
}
