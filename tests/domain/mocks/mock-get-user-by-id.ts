import { GetUserById } from '../../../src/domain/contracts/'
import { User } from '../../../src/domain/entities'
import { mockUser } from '../../domain/mocks'

export const mockGetUserById = (): GetUserById => {
  class GetUserByIdStub implements GetUserById {
    async get (id: string): Promise<User> {
      return await Promise.resolve(mockUser)
    }
  }
  return new GetUserByIdStub()
}
