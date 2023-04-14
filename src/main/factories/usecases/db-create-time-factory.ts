import { DbCreateTimeUseCase } from '../../../application/usecases'
import { TimePostgresRepository, UserPostgresRepository, ProjectPostgresRepository } from '../../../infra/db/postgres'
import { UuidAdapter } from '../../../infra/generators'

export const makeDbCreateTime = (): DbCreateTimeUseCase => {
  const timeRepository = new TimePostgresRepository()
  const userRepository = new UserPostgresRepository()
  const projectRepository = new ProjectPostgresRepository()
  const idGenerator = new UuidAdapter()
  return new DbCreateTimeUseCase(idGenerator, timeRepository, userRepository, projectRepository)
}
