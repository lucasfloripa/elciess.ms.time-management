import { CreateProject } from '../../domain/contracts'
import { badRequest, exceptionHandler, ok } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class CreateProjectController implements Controller {
  constructor (
    private readonly createProject: CreateProject,
    private readonly validation: Validation
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const project = await this.createProject.create(request)
      return ok(project)
    } catch (error) {
      return exceptionHandler(error)
    }
  }
}

interface Request {
  title: string
  description: string
}
