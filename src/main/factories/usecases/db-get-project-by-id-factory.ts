import { DbGetProjectById } from '../../../application/usecases'
import { ProjectPostgresRepository } from '../../../infra/db/postgres'

export const makeDbGetProjectById = (): DbGetProjectById => {
  const projectRepository = new ProjectPostgresRepository()
  return new DbGetProjectById(projectRepository)
}
