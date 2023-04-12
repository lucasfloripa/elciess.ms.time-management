import { Project } from '../../domain/entities'

export interface ProjectRepository {
  create: (params: CreateProjectRepositoryParams) => Promise<Project>
  getById: (userId: string) => Promise<Project | null>
  getAll: () => Promise<Project[] | null>
  update: (params: UpdateProjectRepositoryParams) => Promise<Project>
}

export interface CreateProjectRepositoryParams {
  id: string
  title: string
  description: string
}

export interface UpdateProjectRepositoryParams {
  id: string
  title?: string
  description?: string
  user_ids?: string[]
  time_ids?: string[]
}
