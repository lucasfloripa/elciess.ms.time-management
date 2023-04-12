import { UserRepository } from '../protocols'
import { UpdateUser, UpdateUserParams } from '../../domain/contracts'
import { User } from '../../domain/entities'

export class DbUpdateUserUseCase implements UpdateUser {
  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async update (params: UpdateUserParams): Promise<User> {
    const { userId, ...rest } = params
    const exists = await this.userRepository.getById(userId)
    if (!exists) throw new Error('User not found')
    const newUser = await this.userRepository.update({
      id: userId,
      ...rest
    })
    return newUser
  }
}
