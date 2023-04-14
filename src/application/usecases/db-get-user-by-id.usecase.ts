
import { GetUserById } from '../../domain/contracts'
import { User } from '../../domain/entities'
import { notFound } from '../../domain/helpers'
import { UserRepository } from '../protocols'

export class DbGetUserById implements GetUserById {
  constructor (private readonly userRepository: UserRepository) {}
  async get (id: string): Promise<User> {
    const exists = await this.userRepository.getById(id)
    if (!exists) throw notFound(new Error(`User not found with id ${id}`))
    return exists
  }
}
