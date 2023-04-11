import { User } from '../entities'

export interface CreateUser {
  create: (data: Omit<User, 'id'>) => Promise<User>
}
