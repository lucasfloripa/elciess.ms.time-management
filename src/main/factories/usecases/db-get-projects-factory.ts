import { DbGetProjects } from '../../../application/usecases'
import { ProjectPostgresRepository } from '../../../infra/db/postgres'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbGetProjects = (): DbGetProjects => {
  const projectRepository = new ProjectPostgresRepository()
  const logger = new WinstonLogger()
  return new DbGetProjects(projectRepository, logger)
}
