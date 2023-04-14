import { DbCreateProjectUseCase } from '../../../application/usecases'
import { ProjectPostgresRepository } from '../../../infra/db/postgres'
import { UuidAdapter } from '../../../infra/generators'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbCreateProject = (): DbCreateProjectUseCase => {
  const projectRepository = new ProjectPostgresRepository()
  const idGenerator = new UuidAdapter()
  const logger = new WinstonLogger()
  return new DbCreateProjectUseCase(projectRepository, idGenerator, logger)
}
