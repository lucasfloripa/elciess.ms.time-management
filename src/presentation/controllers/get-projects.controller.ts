import { GetProjects } from '../../domain/contracts'
import { ok } from '../../domain/helpers'
import { Controller, HttpResponse } from '../../presentation/protocols'

export class GetProjectsController implements Controller {
  constructor (
    private readonly getProjects: GetProjects
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const projects = await this.getProjects.getAll()
      return ok(projects)
    } catch (error) {
      return error
    }
  }
}
