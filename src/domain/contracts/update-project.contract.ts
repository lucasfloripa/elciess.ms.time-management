import { Project } from '../entities'

export interface UpdateProject {
  update: (data: UpdateProjectParams) => Promise<Project>
}

export interface UpdateProjectParams {
  projectId: string
  title?: string
  description?: string
  user_ids?: string[]
  time_ids?: string[]
}
