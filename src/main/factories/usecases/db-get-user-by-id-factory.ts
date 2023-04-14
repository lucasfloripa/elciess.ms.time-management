import { DbGetUserById } from '../../../application/usecases'
import { UserPostgresRepository } from '../../../infra/db/postgres'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbGetUserById = (): DbGetUserById => {
  const userRepository = new UserPostgresRepository()
  const logger = new WinstonLogger()
  return new DbGetUserById(userRepository, logger)
}
