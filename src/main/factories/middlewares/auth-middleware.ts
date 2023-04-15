import { AuthRoleMiddleware } from '../../../presentation/middlewares'
import { makeDbAuthMiddleware } from '../usecases'

export const makeAuthMiddleware = (): AuthRoleMiddleware => {
  return new AuthRoleMiddleware(makeDbAuthMiddleware())
}
