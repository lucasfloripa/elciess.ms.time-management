import { Project } from '../entities'

export interface CreateProject {
  create: (data: CreateProjectParams) => Promise<Project>
}
export type CreateProjectParams = Omit<Project, 'id'>
