import { ProjectRepository, CreateProjectRepositoryParams, UpdateProjectRepositoryParams } from '../../../src/application/protocols'

import { Project } from '../../../src/domain/entities'
import { mockProject } from '../../domain/mocks'

export const mockProjectRepository = (): ProjectRepository => {
  class ProjectRepositoryStub implements ProjectRepository {
    async getById (userId: string): Promise<Project | null> {
      return await Promise.resolve(mockProject)
    }

    async update (params: UpdateProjectRepositoryParams): Promise<Project> {
      return await Promise.resolve(mockProject)
    }

    async create (params: CreateProjectRepositoryParams): Promise<Project> {
      return await Promise.resolve(mockProject)
    }

    async getAll (): Promise<Project[] | null> {
      return await Promise.resolve([mockProject])
    }
  }
  return new ProjectRepositoryStub()
}
