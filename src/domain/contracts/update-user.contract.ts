import { User } from '../entities'

export interface UpdateUser {
  update: (data: UpdateUserDTO) => Promise<User>
}

export interface UpdateUserDTO {
  id: string
  name?: string
  email?: string
  password?: string
  project_ids?: string[]
}
