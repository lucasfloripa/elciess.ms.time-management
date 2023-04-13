import { User } from '../../domain/entities'

export interface UserRepository {
  create: (params: CreateUserRepositoryParams) => Promise<User>
  getById: (userId: string) => Promise<User | null>
  checkByEmail: (email: string) => Promise<boolean>
  update: (params: UpdateUserRepositoryParams) => Promise<User | null>
}

export interface CreateUserRepositoryParams {
  id: string
  name: string
  email: string
  password: string
}

export interface UpdateUserRepositoryParams {
  id: string
  name: string
  email: string
  password: string
}
