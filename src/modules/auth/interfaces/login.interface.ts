import type { User } from './user.interface'

export interface Login {
  token: string
  user: User
}
