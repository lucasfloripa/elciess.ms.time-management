import { DbCreateUserUseCase } from '../../../application/usecases'
import { UserPostgresRepository } from '../../../infra/db/postgres'
import { UuidAdapter } from '../../../infra/generators'
import { BcryptAdapter } from '../../../infra/cryptography'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbCreateUser = (): DbCreateUserUseCase => {
  const userRepository = new UserPostgresRepository()
  const idGenerator = new UuidAdapter()
  const bcrypt = new BcryptAdapter(12)
  const logger = new WinstonLogger()
  return new DbCreateUserUseCase(userRepository, idGenerator, bcrypt, logger)
}
