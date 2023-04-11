import { UpdateProject } from '../../domain/contracts'
import { badRequest, exceptionHandler, ok } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateProjectController implements Controller {
  constructor (
    private readonly updateProject: UpdateProject,
    private readonly validation: Validation
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const project = await this.updateProject.update(request)
      return ok(project)
    } catch (error) {
      return exceptionHandler(error)
    }
  }
}

interface Request {
  id: string
  title?: string
  description?: string
  user_ids?: string[]
  time_ids?: string[]
}
