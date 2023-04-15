import { Authenticate, AuthenticateParams, AuthenticateResult, Logger } from '../../domain/contracts'
import { unauthorized } from '../../domain/helpers'
import { UserRepository, Hasher, Encrypter } from '../protocols'

export class DbAuthentication implements Authenticate {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter,
    private readonly logger: Logger
  ) {}

  async auth (credentials: AuthenticateParams): Promise<AuthenticateResult> {
    const { email, password } = credentials

    this.logger.log({
      level: 'info',
      message: 'Loading User'
    })

    const user = await this.userRepository.loadByEmail(email)
    if (user) {
      this.logger.log({
        level: 'info',
        message: 'Checking password provided'
      })

      const isValid = await this.hasher.compare(password, user.password)
      if (isValid) {
        this.logger.log({
          level: 'info',
          message: 'Encrypting token'
        })

        const token = await this.encrypter.encrypt(user.id)
        return { user, token }
      }
    }
    throw unauthorized()
  }
}
