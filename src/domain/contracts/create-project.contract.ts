import { Project } from '../entities'

export interface CreateProject {
  create: (data: CreateProjectParams) => Promise<Project>
}
export type CreateProjectParams = Omit<Project, 'id' | 'user_ids' | 'time_ids'>
