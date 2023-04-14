import { Time } from '../../domain/entities'

export interface TimeRepository {
  create: (params: CreateTimeRepositoryParams) => Promise<Time>
  getAllByProjectId: (projectId: string) => Promise<Time[] | null>
  update: (params: UpdateTimeRepositoryParams) => Promise<Time | null>
}

export interface CreateTimeRepositoryParams {
  id: string
  project_id: string
  user_id: string
  started_at: string
  ended_at: string
}

export interface UpdateTimeRepositoryParams {
  id: string
  project_id: string
  user_id: string
  started_at: string
  ended_at: string
}
