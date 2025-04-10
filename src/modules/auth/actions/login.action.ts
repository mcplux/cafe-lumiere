import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { LoginResponse, User } from '../interfaces'
import { isAxiosError } from 'axios'

type LoginActionResponse =
  | {
      ok: true
      token: string
      user: User
    }
  | {
      ok: false
      message: string
    }

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginActionResponse> => {
  try {
    const { data } = await cafeLumiereApi.post<LoginResponse>('/auth/login', { email, password })

    return { ok: true, token: data.token, user: data.user }
  } catch (error) {
    if (isAxiosError(error) && error.status === 401) {
      return { ok: false, message: 'Invalid Credentials' }
    }

    console.error(error)
    throw new Error('Something went wrong')
  }
}
