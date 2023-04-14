import { DbUpdateUserUseCase } from '../../../application/usecases'
import { BcryptAdapter } from '../../../infra/cryptography'
import { UserPostgresRepository } from '../../../infra/db/postgres'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbUpdateUser = (): DbUpdateUserUseCase => {
  const userRepository = new UserPostgresRepository()
  const bcrypt = new BcryptAdapter(12)
  const logger = new WinstonLogger()
  return new DbUpdateUserUseCase(userRepository, bcrypt, logger)
}
