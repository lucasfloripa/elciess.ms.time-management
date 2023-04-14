import { Hasher, UserRepository } from '../protocols'
import { UpdateUser, UpdateUserParams, Logger } from '../../domain/contracts'
import { User } from '../../domain/entities'
import { notFound } from '../../domain/helpers'

export class DbUpdateUserUseCase implements UpdateUser {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly logger: Logger
  ) {}

  async update (params: UpdateUserParams): Promise<User> {
    const { password, ...rest } = params
    const hashedPassword = await this.hasher.hash(password)

    this.logger.log({
      level: 'info',
      message: 'Updating user'
    })

    const user = await this.userRepository.update({ password: hashedPassword, ...rest })
    if (!user) throw notFound(new Error(`User not found with id ${params.id}`))
    return user
  }
}
