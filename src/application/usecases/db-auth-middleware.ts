import { User } from '../../../src/domain/entities'
import { AuthMiddleware } from '../../../src/domain/contracts'
import { Decrypter, UserRepository } from '../protocols'

export class DbAuthMiddleware implements AuthMiddleware {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly userRepository: UserRepository
  ) { }

  async auth (accessToken: string): Promise<User | null> {
    const decrypt = await this.decrypter.decrypt(accessToken) as any
    console.log(decrypt)
    if (decrypt) {
      const user = await this.userRepository.getById(decrypt.id)
      return user
    }
    return null
  }
}
