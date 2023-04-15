import { Controller, HttpResponse, Validation } from '../protocols'
import { badRequest, ok } from '../../domain/helpers'
import { Authenticate, AuthenticateParams, Logger } from '../../domain/contracts'

export class AuthenticationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authenticate: Authenticate,
    private readonly logger: Logger
  ) { }

  async handle (request: AuthenticateParams): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to AuthenticationController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)
      const authResult = await this.authenticate.auth(request)

      this.logger.log({
        level: 'info',
        message: 'AuthenticationController request ends'
      })

      return ok({ user: authResult.user, token: authResult.token })
    } catch (error) {
      return error
    }
  }
}
