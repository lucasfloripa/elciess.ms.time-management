import { UpdateProject, UpdateProjectParams } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateProjectController implements Controller {
  constructor (
    private readonly updateProject: UpdateProject,
    private readonly validation: Validation
  ) {}

  async handle (request: UpdateProjectParams): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const project = await this.updateProject.update(request)
      return ok(project)
    } catch (error) {
      return error
    }
  }
}
