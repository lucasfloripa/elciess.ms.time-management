import { UserRepository, IdGenerator, Hasher } from '../protocols'
import { CreateUser, CreateUserParams } from '../../domain/contracts'
import { User } from '../../domain/entities'

export class DbCreateUserUseCase implements CreateUser {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator,
    private readonly hasher: Hasher
  ) {}

  async create (params: CreateUserParams): Promise<User> {
    const { email, password, name } = params
    const exists = await this.userRepository.checkByEmail(email)
    if (exists) {
      throw { statusCode: 400, message: 'Email already registred' }
    }
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
