import { CreateUserController } from '../../../presentation/controllers'
import { makeDbCreateUser } from '../usecases'
import { makeCreateUserControllerValidation } from '../validations'

export const makeCreateUserController = (): CreateUserController => {
  const createUser = makeDbCreateUser()
  const createUserControllerValidation = makeCreateUserControllerValidation()
  return new CreateUserController(createUser, createUserControllerValidation)
}
