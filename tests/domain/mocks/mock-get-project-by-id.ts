import { GetProjectById } from '../../../src/domain/contracts'
import { Project } from '../../../src/domain/entities'
import { mockProject } from './mock-project'

export const mockGetProjectById = (): GetProjectById => {
  class GetProjectByIdStub implements GetProjectById {
    async get (id: string): Promise<Project | null> {
      return await Promise.resolve(mockProject)
    }
  }
  return new GetProjectByIdStub()
}
