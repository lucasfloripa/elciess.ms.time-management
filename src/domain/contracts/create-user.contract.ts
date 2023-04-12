import { User } from '../entities'

export interface CreateUser {
  create: (data: CreateUserParams) => Promise<User>
}

export type CreateUserParams = Omit<User, 'id' | 'project_ids'>
