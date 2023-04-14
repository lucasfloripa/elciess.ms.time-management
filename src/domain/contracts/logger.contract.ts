export interface Logger {
  log: (log: Log) => void
}

export interface Log {
  level: string
  message: string
}
