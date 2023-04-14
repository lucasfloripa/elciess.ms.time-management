import { CreateProjectController } from '../../../presentation/controllers'
import { WinstonLogger } from '../../../utils/logger'
import { makeDbCreateProject } from '../usecases'
import { makeCreateProjectControllerValidation } from '../validations'

export const makeCreateProjectController = (): CreateProjectController => {
  const logger = new WinstonLogger()
  const createProject = makeDbCreateProject()
  const createProjectControllerValidation = makeCreateProjectControllerValidation()
  return new CreateProjectController(createProject, createProjectControllerValidation, logger)
}
