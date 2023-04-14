import { GetTimesByProjectId, Logger } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../../presentation/protocols'

export class GetTimesController implements Controller {
  constructor (
    private readonly getTimeByProjectId: GetTimesByProjectId,
    private readonly validation: Validation,
    private readonly logger: Logger
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to GetTimesController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const times = await this.getTimeByProjectId.get(request.projectId)

      this.logger.log({
        level: 'info',
        message: 'GetTimesController request ends'
      })

      return ok(times)
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
  projectId: string
}
