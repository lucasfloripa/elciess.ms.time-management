import { Time } from '../entities'

export interface GetTimesByProjectId {
  get: (projectId: string) => Promise<Time[] | null>
}
