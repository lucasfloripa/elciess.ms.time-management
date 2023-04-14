import { DbUpdateProjectUseCase } from '../../../application/usecases'
import { ProjectPostgresRepository } from '../../../infra/db/postgres'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbUpdateProject = (): DbUpdateProjectUseCase => {
  const projectRepository = new ProjectPostgresRepository()
  const logger = new WinstonLogger()
  return new DbUpdateProjectUseCase(projectRepository, logger)
}
