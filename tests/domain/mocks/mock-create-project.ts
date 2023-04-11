import { CreateProject } from '../../../src/domain/contracts'
import { Project } from '../../../src/domain/entities'
import { mockProject } from './mock-project'

export const mockCreateProject = (): CreateProject => {
  class CreateProjectStub implements CreateProject {
    async create (data: Omit<Project, 'id' | 'user_ids' | 'time_ids'>): Promise<Project> {
      return await Promise.resolve(mockProject)
    }
  }
  return new CreateProjectStub()
}
