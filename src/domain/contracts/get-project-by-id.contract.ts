import { Project } from '../entities'

export interface GetProjectById {
  get: (id: string) => Promise<Project | null>
}
