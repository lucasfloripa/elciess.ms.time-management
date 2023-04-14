import { Logger, Log } from '../../domain/contracts'
import { logger } from '../../main/config'

export class WinstonLogger implements Logger {
  log (log: Log): void {
    const { level, message } = log

    switch (level) {
      case 'error':
        logger.error(message)
        break
      case 'warn':
        logger.warn(message)
        break
      case 'info':
        logger.info(message)
        break
      case 'http':
        logger.http(message)
        break
      case 'debug':
        logger.debug(message)
        break
    }
  }
}
