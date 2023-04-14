import { GetProjectsController } from '../../../presentation/controllers'
import { makeDbGetProjects } from '../usecases'

export const makeGetProjectsController = (): GetProjectsController => {
  const getProjects = makeDbGetProjects()
  return new GetProjectsController(getProjects)
}
