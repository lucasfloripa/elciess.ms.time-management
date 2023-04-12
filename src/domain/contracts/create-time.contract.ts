import { Time } from '../entities'

export interface CreateTime {
  create: (data: Omit<Time, 'id' | 'started_at' | 'ended_at'>) => Promise<Time>
}
export type CreateTimeParams = Omit<Time, 'id'>
