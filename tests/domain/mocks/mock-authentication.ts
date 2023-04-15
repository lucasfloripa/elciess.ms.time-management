import { Authenticate, AuthenticateParams, AuthenticateResult } from '../../../src/domain/contracts'
import { mockUser } from './mock-user'

export const mockAuthentication = (): Authenticate => {
  class AuthenticateStub implements Authenticate {
    async auth (data: AuthenticateParams): Promise<AuthenticateResult> {
      return await Promise.resolve({ user: mockUser, token: 'any-token' })
    }
  }
  return new AuthenticateStub()
}
