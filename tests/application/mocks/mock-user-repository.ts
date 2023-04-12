import { UserRepository, CreateUserRepositoryParams, UpdateUserRepositoryParams } from '../../../src/application/protocols'

import { User } from '../../../src/domain/entities'
import { mockUser } from '../../domain/mocks'

export const mockUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async getById (userId: string): Promise<User | null> {
      return await Promise.resolve(mockUser)
    }

    async update (params: UpdateUserRepositoryParams): Promise<User> {
      return await Promise.resolve(mockUser)
    }

    async checkByEmail (email: string): Promise<boolean> {
      return await Promise.resolve(false)
    }

    async create (params: CreateUserRepositoryParams): Promise<User> {
      return await Promise.resolve(mockUser)
    }
  }
  return new UserRepositoryStub()
}
