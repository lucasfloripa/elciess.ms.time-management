import { UpdateProject } from '../../../src/domain/contracts'
import { Project } from '../../../src/domain/entities'
import { mockProject } from './mock-project'

export const mockUpdateProject = (): UpdateProject => {
  class UpdateProjectStub implements UpdateProject {
    async update (data: Project): Promise<Project> {
      return await Promise.resolve(mockProject)
    }
  }
  return new UpdateProjectStub()
}
