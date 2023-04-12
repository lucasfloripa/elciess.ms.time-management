import { Time } from '../entities'

export interface UpdateTime {
  update: (data: UpdateTimeParams) => Promise<Time>
}

export interface UpdateTimeParams {
  timeId: string
  project_id?: string
  user_id?: string
  started_at?: Date
  ended_at?: Date
}
