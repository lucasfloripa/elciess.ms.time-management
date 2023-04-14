import { GetUserController } from '../../../presentation/controllers'
import { WinstonLogger } from '../../../utils/logger'
import { makeDbGetUserById } from '../usecases'
import { makeGetUserControllerValidation } from '../validations'

export const makeGetUserController = (): GetUserController => {
  const logger = new WinstonLogger()
  const getUserById = makeDbGetUserById()
  const getUserControllerValidation = makeGetUserControllerValidation()
  return new GetUserController(getUserById, getUserControllerValidation, logger)
}
