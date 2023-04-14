
import { Log, Logger } from '../../../src/domain/contracts'

export const mockFakeLogger = (): Logger => {
  class FakeLogger implements Logger {
    log (log: Log): void {

    }
  }
  return new FakeLogger()
}
