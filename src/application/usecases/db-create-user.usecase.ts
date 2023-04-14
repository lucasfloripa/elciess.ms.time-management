import { UserRepository, IdGenerator, Hasher } from '../protocols'
import { CreateUser, CreateUserParams, Logger } from '../../domain/contracts'
import { User } from '../../domain/entities'
import { EmailInUseError } from '../../domain/errors'
import { badRequest } from '../../domain/helpers'

export class DbCreateUserUseCase implements CreateUser {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator,
    private readonly hasher: Hasher,
    private readonly logger: Logger
  ) {}

  async create (params: CreateUserParams): Promise<User> {
    const { email, password, name } = params

    this.logger.log({
      level: 'info',
      message: 'Checking if email provided exists'
    })

    const exists = await this.userRepository.checkByEmail(email)
    if (exists) throw badRequest(new EmailInUseError())

    const id = await this.idGenerator.generate()
    const hashedPassword = await this.hasher.hash(password)

    this.logger.log({
      level: 'info',
      message: 'Creating new user'
    })

    const newUser = await this.userRepository.create({
      id,
      password: hashedPassword,
      email,
      name
    })
    return newUser
  }
}
