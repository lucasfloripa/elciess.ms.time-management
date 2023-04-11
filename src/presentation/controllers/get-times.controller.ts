import { GetTimesByProjectId } from '../../domain/contracts'
import { badRequest, ok, exceptionHandler } from '../../presentation/helpers'
import { Controller, HttpResponse, Validation } from '../../presentation/protocols'

export class GetTimesController implements Controller {
  constructor (
    private readonly getTimeByProjectId: GetTimesByProjectId,
    private readonly validation: Validation
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const times = await this.getTimeByProjectId.get(request.projectId)
      return ok(times)
    } catch (error) {
      return exceptionHandler(error)
    }
  }
}

interface Request {
  projectId: string
}
