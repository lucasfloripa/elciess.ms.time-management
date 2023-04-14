import { Time } from '../entities'

export interface CreateTime {
  create: (data: CreateTimeParams) => Promise<Time>
}
export type CreateTimeParams = Omit<Time, 'id'>
