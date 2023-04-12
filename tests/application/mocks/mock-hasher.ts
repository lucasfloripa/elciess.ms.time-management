import { Hasher } from '../../../src/application/protocols'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (plaintext: string): Promise<string> {
      return await Promise.resolve('123')
    }
  }
  return new HasherStub()
}
