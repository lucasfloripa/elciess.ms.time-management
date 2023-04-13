import { Project } from '../entities'

export interface UpdateProject {
  update: (data: UpdateProjectParams) => Promise<Project>
}

export interface UpdateProjectParams {
  id: string
  title: string
  description: string
}
