import { DbUpdateUserUseCase } from '../../../application/usecases'
import { BcryptAdapter } from '../../../infra/cryptography'
import { UserPostgresRepository } from '../../../infra/db/postgres'

export const makeDbUpdateUser = (): DbUpdateUserUseCase => {
  const userRepository = new UserPostgresRepository()
  const bcrypt = new BcryptAdapter(12)
  return new DbUpdateUserUseCase(userRepository, bcrypt)
}
