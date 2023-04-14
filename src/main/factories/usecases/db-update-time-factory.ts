import { DbUpdateTimeUseCase } from '../../../application/usecases'
import { ProjectPostgresRepository, TimePostgresRepository, UserPostgresRepository } from '../../../infra/db/postgres'

export const makeDbUpdateTime = (): DbUpdateTimeUseCase => {
  const timeRepository = new TimePostgresRepository()
  const userRepository = new UserPostgresRepository()
  const projectRepository = new ProjectPostgresRepository()
  return new DbUpdateTimeUseCase(timeRepository, userRepository, projectRepository)
}
