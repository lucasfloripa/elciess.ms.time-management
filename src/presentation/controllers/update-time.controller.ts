import { UpdateTime } from '../../domain/contracts'
import { badRequest, exceptionHandler, ok } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateTimeController implements Controller {
  constructor (
    private readonly updateTime: UpdateTime,
    private readonly validation: Validation
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const time = await this.updateTime.update(request)
      return ok(time)
    } catch (error) {
      return exceptionHandler(error)
    }
  }
}

interface Request {
  timeId: string
  project_id?: string
  user_id?: string
  started_at?: Date
  ended_at?: Date
}
