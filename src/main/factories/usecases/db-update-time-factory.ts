import { DbUpdateTimeUseCase } from '../../../application/usecases'
import { ProjectPostgresRepository, TimePostgresRepository, UserPostgresRepository } from '../../../infra/db/postgres'
import { WinstonLogger } from '../../../utils/logger'

export const makeDbUpdateTime = (): DbUpdateTimeUseCase => {
  const timeRepository = new TimePostgresRepository()
  const userRepository = new UserPostgresRepository()
  const projectRepository = new ProjectPostgresRepository()
  const logger = new WinstonLogger()
  return new DbUpdateTimeUseCase(timeRepository, userRepository, projectRepository, logger)
}
