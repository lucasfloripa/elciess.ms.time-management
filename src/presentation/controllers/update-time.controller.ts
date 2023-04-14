import { UpdateTime, UpdateTimeParams } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateTimeController implements Controller {
  constructor (
    private readonly updateTime: UpdateTime,
    private readonly validation: Validation
  ) {}

  async handle (request: UpdateTimeParams): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const time = await this.updateTime.update(request)
      return ok(time)
    } catch (error) {
      return error
    }
  }
}
