import { HttpResponse, Middleware } from '../protocols'
import { forbidden, ok, unauthorized } from '../../../src/domain/helpers'
import { AccessDeniedError } from '../../../src/domain/errors'
import { AuthMiddleware, AuthMiddlewareParams } from '../../../src/domain/contracts'

export class AuthRoleMiddleware implements Middleware {
  constructor (
    private readonly authMiddleware: AuthMiddleware
  ) { }

  async handle (request: AuthMiddlewareParams): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const user = await this.authMiddleware.auth(accessToken)
        if (user) {
          return ok({ userId: user.id })
        }
        return forbidden(new AccessDeniedError())
      }
      return unauthorized()
    } catch (error) {
      return error
    }
  }
}
