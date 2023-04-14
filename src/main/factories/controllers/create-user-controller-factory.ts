import { CreateUserController } from '../../../presentation/controllers'
import { makeDbCreateUser } from '../usecases'
import { WinstonLogger } from '../../../utils/logger'
import { makeCreateUserControllerValidation } from '../validations'

export const makeCreateUserController = (): CreateUserController => {
  const logger = new WinstonLogger()
  const createUser = makeDbCreateUser()
  const createUserControllerValidation = makeCreateUserControllerValidation()
  return new CreateUserController(createUser, createUserControllerValidation, logger)
}
