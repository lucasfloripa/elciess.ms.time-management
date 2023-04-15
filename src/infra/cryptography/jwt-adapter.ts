import { Encrypter } from '../../application/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  async encrypt (id: string): Promise<string> {
    return jwt.sign({ id }, String(process.env.JWT_SECRET))
  }

  async decrypt (text: string): Promise<string> {
    return jwt.verify(text, String(process.env.JWT_SECRET)) as any
  }
}
