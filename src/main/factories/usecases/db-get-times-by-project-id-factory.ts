import { DbGetTimesByProjectId } from '../../../application/usecases'
import { TimePostgresRepository } from '../../../infra/db/postgres'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbGetTimesByProjectId = (): DbGetTimesByProjectId => {
  const timeRepository = new TimePostgresRepository()
  const logger = new WinstonLogger()
  return new DbGetTimesByProjectId(timeRepository, logger)
}
