import { GetUserById, Logger } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../../presentation/protocols'

export class GetUserController implements Controller {
  constructor (
    private readonly getUserById: GetUserById,
    private readonly validation: Validation,
    private readonly logger: Logger
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to GetUserController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const user = await this.getUserById.get(request.id)

      this.logger.log({
        level: 'info',
        message: 'GetUserController request ends'
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

interface Request {
  id: string
}
