import { Hasher } from '../../application/protocols'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (
    private readonly salt: number
  ) {}

  async hash (plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt)
  }

  async compare (hash: string, hashToCompare: string): Promise<boolean> {
    return await bcrypt.compare(hash, hashToCompare)
  }
}
