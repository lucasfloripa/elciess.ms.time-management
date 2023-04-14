import { CreateTime, CreateTimeParams } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class CreateTimeController implements Controller {
  constructor (
    private readonly createTime: CreateTime,
    private readonly validation: Validation
  ) {}

  async handle (request: CreateTimeParams): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const time = await this.createTime.create(request)
      return ok(time)
    } catch (error) {
      return error
    }
  }
}
