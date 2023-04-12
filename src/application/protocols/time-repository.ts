import { Time } from '../../domain/entities'

export interface TimeRepository {
  create: (params: CreateTimeRepositoryParams) => Promise<Time>
  getById: (userId: string) => Promise<Time | null>
  getAllByProjectId: (projectId: string) => Promise<Time[] | null>
  update: (params: UpdateTimeRepositoryParams) => Promise<Time>
}

export interface CreateTimeRepositoryParams {
  id: string
  project_id: string
  user_id: string
  started_at: Date
  ended_at: Date
}

export interface UpdateTimeRepositoryParams {
  id: string
  project_id?: string
  user_id?: string
  started_at?: Date
  ended_at?: Date
}
