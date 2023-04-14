import { GetProjects, Logger } from '../../domain/contracts'
import { ok } from '../../domain/helpers'
import { Controller, HttpResponse } from '../../presentation/protocols'

export class GetProjectsController implements Controller {
  constructor (
    private readonly getProjects: GetProjects,
    private readonly logger: Logger
  ) {}

  async handle (): Promise<HttpResponse> {
    this.logger.log({
      level: 'info',
      message: 'Received request to GetProjectsController'
    })

    try {
      const projects = await this.getProjects.getAll()

      this.logger.log({
        level: 'info',
        message: 'GetProjectsController request ends'
      })

      return ok(projects)
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: `${error.statusCode} ${error.body.message}`
      })

      return error
    }
  }
}
