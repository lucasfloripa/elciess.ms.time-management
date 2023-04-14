import { UpdateProject, UpdateProjectParams, Logger } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateProjectController implements Controller {
  constructor (
    private readonly updateProject: UpdateProject,
    private readonly validation: Validation,
    private readonly logger: Logger
  ) {}

  async handle (request: UpdateProjectParams): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to UpdateProjectController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const project = await this.updateProject.update(request)

      this.logger.log({
        level: 'info',
        message: 'UpdateProjectController request ends'
      })

      return ok(project)
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: `${error.statusCode} ${error.body.message}`
      })

      return error
    }
  }
}
