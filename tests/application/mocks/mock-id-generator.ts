import { IdGenerator } from '../../../src/application/protocols'

export const mockIdGenerator = (): IdGenerator => {
  class IdGeneratorStub implements IdGenerator {
    async generate (): Promise<string> {
      return await Promise.resolve('123')
    }
  }
  return new IdGeneratorStub()
}
