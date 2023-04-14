import morgan from 'morgan'
import { logger } from './winston'

const stream = {
  write: (message: string) => logger.http(message)
}

const skip = (): boolean => {
  const env = process.env.NODE_ENV
  return env !== 'dev'
}

export const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)
