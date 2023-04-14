import { DbGetProjects } from '../../../application/usecases'
import { ProjectPostgresRepository } from '../../../infra/db/postgres'

export const makeDbGetProjects = (): DbGetProjects => {
  const projectRepository = new ProjectPostgresRepository()
  return new DbGetProjects(projectRepository)
}
