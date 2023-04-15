import { Decrypter } from '../../../src/application/protocols'

export const mockDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (text: string): Promise<any> {
      return { id: '1' }
    }
  }
  return new DecrypterStub()
}
