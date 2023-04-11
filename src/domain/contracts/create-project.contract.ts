import { Project } from '../entities'

export interface CreateProject {
  create: (data: Omit<Project, 'id' | 'user_ids' | 'time_ids'>) => Promise<Project>
}
