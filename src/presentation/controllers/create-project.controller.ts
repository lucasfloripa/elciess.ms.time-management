import { CreateProject, CreateProjectParams, Logger } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class CreateProjectController implements Controller {
  constructor (
    private readonly createProject: CreateProject,
    private readonly validation: Validation,
    private readonly logger: Logger
  ) {}

  async handle (request: CreateProjectParams): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to CreateProjectController'
    })

    this.logger.log({
      level: 'info',
      message: `Request Params: ${JSON.stringify(request)}`
    })

    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const project = await this.createProject.create(request)

      this.logger.log({
        level: 'info',
        message: 'CreateProjectController request ends'
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
