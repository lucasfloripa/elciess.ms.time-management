import { CreateTime, CreateTimeParams, Logger } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class CreateTimeController implements Controller {
  constructor (
    private readonly createTime: CreateTime,
    private readonly validation: Validation,
    private readonly logger: Logger
  ) {}

  async handle (request: CreateTimeParams): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to CreateTimeController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const time = await this.createTime.create(request)

      this.logger.log({
        level: 'info',
        message: 'CreateTimeController request ends'
      })

      return ok(time)
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: `${error.statusCode} ${error.body.message}`
      })

      return error
    }
  }
}
