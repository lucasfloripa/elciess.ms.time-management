import { UpdateUser } from '../../../src/domain/contracts'
import { User } from '../../../src/domain/entities'
import { mockUser } from './mock-user'

export const mockUpdateUser = (): UpdateUser => {
  class UpdateUserStub implements UpdateUser {
    async update (data: User): Promise<User> {
      return await Promise.resolve(mockUser)
    }
  }
  return new UpdateUserStub()
}
