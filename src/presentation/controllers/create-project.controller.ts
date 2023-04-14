import { CreateProject, CreateProjectParams } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class CreateProjectController implements Controller {
  constructor (
    private readonly createProject: CreateProject,
    private readonly validation: Validation
  ) {}

  async handle (request: CreateProjectParams): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const project = await this.createProject.create(request)
      return ok(project)
    } catch (error) {
      return error
    }
  }
}
