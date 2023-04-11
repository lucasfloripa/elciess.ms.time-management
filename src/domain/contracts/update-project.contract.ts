import { Project } from '../entities'

export interface UpdateProject {
  update: (data: UpdateProjectDTO) => Promise<Project>
}

interface UpdateProjectDTO {
  id: string
  title?: string
  description?: string
  user_ids?: string[]
  time_ids?: string[]
}
