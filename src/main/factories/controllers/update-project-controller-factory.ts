import { UpdateProjectController } from '../../../presentation/controllers'
import { WinstonLogger } from '../../../utils/logger'
import { makeDbUpdateProject } from '../usecases'
import { makeUpdateProjectControllerValidation } from '../validations'

export const makeUpdateProjectController = (): UpdateProjectController => {
  const logger = new WinstonLogger()
  const updateProject = makeDbUpdateProject()
  const updateProjectControllerValidation = makeUpdateProjectControllerValidation()
  return new UpdateProjectController(updateProject, updateProjectControllerValidation, logger)
}
