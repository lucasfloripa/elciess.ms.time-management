import { UserRepository, IdGenerator, Hasher } from '../protocols'
import { CreateUser, CreateUserParams } from '../../domain/contracts'
import { User } from '../../domain/entities'
import { EmailInUseError } from '../../domain/errors'
import { badRequest } from '../../domain/helpers'

export class DbCreateUserUseCase implements CreateUser {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator,
    private readonly hasher: Hasher
  ) {}

  async create (params: CreateUserParams): Promise<User> {
    const { email, password, name } = params
    const exists = await this.userRepository.checkByEmail(email)
    if (exists) throw badRequest(new EmailInUseError())
    const id = await this.idGenerator.generate()
    const hashedPassword = await this.hasher.hash(password)
    const newUser = await this.userRepository.create({
      id,
      password: hashedPassword,
      email,
      name
    })
    return newUser
  }
}
