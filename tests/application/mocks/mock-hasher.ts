import { Hasher } from '../../../src/application/protocols'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async compare (hash: string, hashToCompare: string): Promise<boolean> {
      return await Promise.resolve(true)
    }

    async hash (plaintext: string): Promise<string> {
      return await Promise.resolve('123')
    }
  }
  return new HasherStub()
}
