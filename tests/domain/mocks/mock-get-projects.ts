import { GetProjects } from '../../../src/domain/contracts'
import { Project } from '../../../src/domain/entities'
import { mockProject } from './mock-project'

export const mockGetProjects = (): GetProjects => {
  class GetProjectsStub implements GetProjects {
    async getAll (): Promise<Project[]> {
      return await Promise.resolve([mockProject])
    }
  }
  return new GetProjectsStub()
}
