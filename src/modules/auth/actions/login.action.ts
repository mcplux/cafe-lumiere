import cafeLumiereApi from '@/api/cafe-lumiere.api'
import type { LoginResponse } from '../interfaces'

type LoginActionResponse =
  | {
      ok: true
      token: string
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

    return { ok: true, token: data.token }
  } catch (error) {
    console.error(error)
    return { ok: false, message: 'Invalid Credentials' }
  }
}
