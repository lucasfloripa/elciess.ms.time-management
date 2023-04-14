import { DbUpdateProjectUseCase } from '../../../application/usecases'
import { ProjectPostgresRepository } from '../../../infra/db/postgres'

export const makeDbUpdateProject = (): DbUpdateProjectUseCase => {
  const projectRepository = new ProjectPostgresRepository()
  return new DbUpdateProjectUseCase(projectRepository)
}
