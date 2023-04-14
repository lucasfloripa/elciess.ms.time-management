import { DbGetProjectById } from '../../../application/usecases'
import { ProjectPostgresRepository } from '../../../infra/db/postgres'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbGetProjectById = (): DbGetProjectById => {
  const projectRepository = new ProjectPostgresRepository()
  const logger = new WinstonLogger()
  return new DbGetProjectById(projectRepository, logger)
}
