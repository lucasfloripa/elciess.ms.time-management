import { GetUserController } from '../../../presentation/controllers'
import { makeDbGetUserById } from '../usecases'
import { makeGetUserControllerValidation } from '../validations'

export const makeGetUserController = (): GetUserController => {
  const getUserById = makeDbGetUserById()
  const getUserControllerValidation = makeGetUserControllerValidation()
  return new GetUserController(getUserById, getUserControllerValidation)
}
