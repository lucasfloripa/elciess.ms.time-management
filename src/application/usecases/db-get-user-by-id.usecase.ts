import { GetUserById, Logger } from '../../domain/contracts'
import { User } from '../../domain/entities'
import { notFound } from '../../domain/helpers'
import { UserRepository } from '../protocols'

export class DbGetUserById implements GetUserById {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly logger: Logger) {}

  async get (id: string): Promise<User> {
    this.logger.log({
      level: 'info',
      message: 'Get user by id'
    })

    const exists = await this.userRepository.getById(id)
    if (!exists) throw notFound(new Error(`User not found with id ${id}`))
    return exists
  }
}
