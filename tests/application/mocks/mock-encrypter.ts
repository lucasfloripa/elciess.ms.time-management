import { Encrypter } from '../../../src/application/protocols'

export const mockEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return 'any_token'
    }
  }
  return new EncrypterStub()
}
