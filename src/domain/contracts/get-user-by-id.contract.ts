import { User } from '../entities'

export interface GetUserById {
  get: (id: string) => Promise<User | null>
}
