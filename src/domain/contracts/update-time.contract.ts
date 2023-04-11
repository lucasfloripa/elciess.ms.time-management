import { Time } from '../entities'

export interface UpdateTime {
  update: (data: UpdateTimeDTO) => Promise<Time>
}

export interface UpdateTimeDTO {
  id: string
  project_id?: string
  user_id?: string
  started_at?: Date
  ended_at?: Date
}
