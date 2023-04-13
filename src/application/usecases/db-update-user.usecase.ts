import { UserRepository } from '../protocols'
import { UpdateUser, UpdateUserParams } from '../../domain/contracts'
import { User } from '../../domain/entities'

export class DbUpdateUserUseCase implements UpdateUser {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async update (params: UpdateUserParams): Promise<User> {
    const user = await this.userRepository.update(params)
    if (!user) throw new Error('User not found')
    return user
  }
}
