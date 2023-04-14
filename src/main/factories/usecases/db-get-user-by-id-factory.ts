import { DbGetUserById } from '../../../application/usecases'
import { UserPostgresRepository } from '../../../infra/db/postgres'

export const makeDbGetUserById = (): DbGetUserById => {
  const userRepository = new UserPostgresRepository()
  return new DbGetUserById(userRepository)
}
