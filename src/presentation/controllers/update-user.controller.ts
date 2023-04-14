import { UpdateUser, UpdateUserParams, Logger } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateUserController implements Controller {
  constructor (
    private readonly updateUser: UpdateUser,
    private readonly validation: Validation,
    private readonly logger: Logger
  ) {}

  async handle (request: UpdateUserParams): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to UpdateUserController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const user = await this.updateUser.update(request)

      this.logger.log({
        level: 'info',
        message: 'UpdateUserController request ends'
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
