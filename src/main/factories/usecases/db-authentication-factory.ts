import { DbAuthentication } from '../../../application/usecases'
import { UserPostgresRepository } from '../../../infra/db/postgres'
import { BcryptAdapter, JwtAdapter } from '../../../infra/cryptography'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbAuthentication = (): DbAuthentication => {
  const userRepository = new UserPostgresRepository()
  const bcrypt = new BcryptAdapter(12)
  const jwt = new JwtAdapter()
  const logger = new WinstonLogger()
  return new DbAuthentication(userRepository, bcrypt, jwt, logger)
}
