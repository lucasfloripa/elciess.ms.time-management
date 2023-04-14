import { UpdateUserController } from '../../../presentation/controllers'
import { WinstonLogger } from '../../../utils/logger'
import { makeDbUpdateUser } from '../usecases'
import { makeUpdateUserControllerValidation } from '../validations'

export const makeUpdateUserController = (): UpdateUserController => {
  const logger = new WinstonLogger()
  const updateProject = makeDbUpdateUser()
  const updateProjectControllerValidation = makeUpdateUserControllerValidation()
  return new UpdateUserController(updateProject, updateProjectControllerValidation, logger)
}
