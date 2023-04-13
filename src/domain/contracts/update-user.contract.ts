import { User } from '../entities'

export interface UpdateUser {
  update: (data: UpdateUserParams) => Promise<User>
}

export interface UpdateUserParams {
  id: string
  name: string
  email: string
  password: string
}
