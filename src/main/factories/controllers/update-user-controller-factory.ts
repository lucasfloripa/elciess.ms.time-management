import { UpdateUserController } from '../../../presentation/controllers'
import { makeDbUpdateUser } from '../usecases'
import { makeUpdateUserControllerValidation } from '../validations'

export const makeUpdateUserController = (): UpdateUserController => {
  const updateProject = makeDbUpdateUser()
  const updateProjectControllerValidation = makeUpdateUserControllerValidation()
  return new UpdateUserController(updateProject, updateProjectControllerValidation)
}
