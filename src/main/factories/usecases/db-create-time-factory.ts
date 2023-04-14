import { DbCreateTimeUseCase } from '../../../application/usecases'
import { TimePostgresRepository, UserPostgresRepository, ProjectPostgresRepository } from '../../../infra/db/postgres'
import { UuidAdapter } from '../../../infra/generators'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbCreateTime = (): DbCreateTimeUseCase => {
  const timeRepository = new TimePostgresRepository()
  const userRepository = new UserPostgresRepository()
  const projectRepository = new ProjectPostgresRepository()
  const idGenerator = new UuidAdapter()
  const logger = new WinstonLogger()
  return new DbCreateTimeUseCase(idGenerator, timeRepository, userRepository, projectRepository, logger)
}
