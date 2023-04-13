import { Time } from '../entities'

export interface UpdateTime {
  update: (data: UpdateTimeParams) => Promise<Time>
}

export interface UpdateTimeParams {
  id: string
  project_id: string
  user_id: string
  started_at: string
  ended_at: string
}
