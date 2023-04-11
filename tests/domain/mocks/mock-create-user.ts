import { CreateUser } from '../../../src/domain/contracts'
import { User } from '../../../src/domain/entities'
import { mockUser } from './mock-user'

export const mockCreateUser = (): CreateUser => {
  class CreateUserStub implements CreateUser {
    async create (data: Omit<User, 'id'>): Promise<User> {
      return await Promise.resolve(mockUser)
    }
  }
  return new CreateUserStub()
}
