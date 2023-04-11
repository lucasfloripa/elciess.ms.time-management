import { CreateTime } from '../../domain/contracts'
import { badRequest, exceptionHandler, ok } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class CreateTimeController implements Controller {
  constructor (
    private readonly createTime: CreateTime,
    private readonly validation: Validation
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const time = await this.createTime.create(request)
      return ok(time)
    } catch (error) {
      return exceptionHandler(error)
    }
  }
}

interface Request {
  project_id: string
  user_id: string
}
