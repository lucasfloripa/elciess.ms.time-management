import winston from 'winston'
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = (): string => {
  const env = process.env.NODE_ENV
  const isDevelopment = env === 'dev'
  return isDevelopment ? 'debug' : 'info'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
)

const transports = [
  new winston.transports.Console()
]

export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  defaultMeta: {
    service: 'category-service'
  },
  transports
})
