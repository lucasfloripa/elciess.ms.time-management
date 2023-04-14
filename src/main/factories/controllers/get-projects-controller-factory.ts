import { GetProjectsController } from '../../../presentation/controllers'
import { makeDbGetProjects } from '../usecases'
import { WinstonLogger } from '../../../utils/logger'

export const makeGetProjectsController = (): GetProjectsController => {
  const logger = new WinstonLogger()
  const getProjects = makeDbGetProjects()
  return new GetProjectsController(getProjects, logger)
}
