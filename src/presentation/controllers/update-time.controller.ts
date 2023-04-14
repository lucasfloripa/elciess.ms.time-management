import { UpdateTime, UpdateTimeParams, Logger } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateTimeController implements Controller {
  constructor (
    private readonly updateTime: UpdateTime,
    private readonly validation: Validation,
    private readonly logger: Logger
  ) {}

  async handle (request: UpdateTimeParams): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to UpdateTimeController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const time = await this.updateTime.update(request)

      this.logger.log({
        level: 'info',
        message: 'UpdateTimeController request ends'
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
