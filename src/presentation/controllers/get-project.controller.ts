import { GetProjectById } from '../../domain/contracts'
import { badRequest, ok, exceptionHandler } from '../../presentation/helpers'
import { Controller, HttpResponse, Validation } from '../../presentation/protocols'

export class GetProjectController implements Controller {
  constructor (
    private readonly getProjectById: GetProjectById,
    private readonly validation: Validation
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const project = await this.getProjectById.get(request.id)
      return ok(project)
    } catch (error) {
      return exceptionHandler(error)
    }
  }
}

interface Request {
  id: string
}
