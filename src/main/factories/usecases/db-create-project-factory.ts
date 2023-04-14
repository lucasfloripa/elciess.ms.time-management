import { DbCreateProjectUseCase } from '../../../application/usecases'
import { ProjectPostgresRepository } from '../../../infra/db/postgres'
import { UuidAdapter } from '../../../infra/generators'

export const makeDbCreateProject = (): DbCreateProjectUseCase => {
  const projectRepository = new ProjectPostgresRepository()
  const idGenerator = new UuidAdapter()
  return new DbCreateProjectUseCase(projectRepository, idGenerator)
}
