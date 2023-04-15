import { DbAuthAuthentication } from '../../../application/usecases'
import { AuthMiddleware } from '../../../domain/contracts'
import { UserPostgresRepository } from '../../../infra/db/postgres'
import { JwtAdapter } from '../../../infra/cryptography'

export const makeDbAuthMiddleware = (): AuthMiddleware => {
  const jwtAdapter = new JwtAdapter()
  const userMongoRepository = new UserPostgresRepository()
  return new DbAuthAuthentication(jwtAdapter, userMongoRepository)
}
