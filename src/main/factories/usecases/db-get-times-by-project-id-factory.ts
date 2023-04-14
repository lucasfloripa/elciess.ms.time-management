import { DbGetTimesByProjectId } from '../../../application/usecases'
import { TimePostgresRepository } from '../../../infra/db/postgres'

export const makeDbGetTimesByProjectId = (): DbGetTimesByProjectId => {
  const timeRepository = new TimePostgresRepository()
  return new DbGetTimesByProjectId(timeRepository)
}
