import { isAxiosError } from 'axios'

import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { CheckStatusResponse, User } from '../interfaces'

type CheckStatusActionResponse =
  | {
      ok: true
      user: User
    }
  | {
      ok: false
    }

export const checkAuthStatusAction = async (): Promise<CheckStatusActionResponse> => {
  try {
    const { data } = await cafeLumiereApi.get<CheckStatusResponse>('/auth/me')

    return {
      ok: true,
      user: data.user,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 401) {
      return {
        ok: false,
      }
    }

    console.error(error)
    throw new Error('Something went wrong')
  }
}
