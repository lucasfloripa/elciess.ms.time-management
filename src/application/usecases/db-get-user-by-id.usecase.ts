
import { GetUserById } from '../../domain/contracts'
import { User } from '../../domain/entities'
import { UserRepository } from '../protocols'

export class DbGetUserById implements GetUserById {
  constructor (private readonly userRepository: UserRepository) {}
  async get (id: string): Promise<User> {
    const exists = await this.userRepository.getById(id)
    if (!exists) throw { statusCode: 404, message: 'User not found' }
    return exists
  }
}
