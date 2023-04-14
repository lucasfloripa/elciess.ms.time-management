import { CreateUser, CreateUserParams, Logger } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class CreateUserController implements Controller {
  constructor (
    private readonly createUser: CreateUser,
    private readonly validation: Validation,
    private readonly logger: Logger
  ) {}

  async handle (request: CreateUserParams): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to CreateUserController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const user = await this.createUser.create(request)

      this.logger.log({
        level: 'info',
        message: 'CreateUserController request ends'
      })

      return ok(user)
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: `${error.statusCode} ${error.body.message}`
      })

      return error
    }
  }
}
