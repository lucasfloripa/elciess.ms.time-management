import { GetProjectController } from '../../../presentation/controllers'
import { makeDbGetProjectById } from '../usecases'
import { WinstonLogger } from '../../../utils/logger'
import { makeGetProjectControllerValidation } from '../validations'

export const makeGetProjectController = (): GetProjectController => {
  const logger = new WinstonLogger()
  const getProjectById = makeDbGetProjectById()
  const getProjectControllerValidation = makeGetProjectControllerValidation()
  return new GetProjectController(getProjectById, getProjectControllerValidation, logger)
}
