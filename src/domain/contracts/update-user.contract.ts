import { User } from '../entities'

export interface UpdateUser {
  update: (data: UpdateUserParams) => Promise<User>
}

export interface UpdateUserParams {
  userId: string
  name?: string
  email?: string
  password?: string
  project_ids?: string[]
}
