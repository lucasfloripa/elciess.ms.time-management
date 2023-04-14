import { GetProjectById, Logger } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../../presentation/protocols'

export class GetProjectController implements Controller {
  constructor (
    private readonly getProjectById: GetProjectById,
    private readonly validation: Validation,
    private readonly logger: Logger
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to GetProjectController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const project = await this.getProjectById.get(request.id)

      this.logger.log({
        level: 'info',
        message: 'GetProjectController request ends'
      })

      return ok(project)
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
