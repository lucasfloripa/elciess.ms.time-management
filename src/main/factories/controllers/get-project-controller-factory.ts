import { GetProjectController } from '../../../presentation/controllers'
import { makeDbGetProjectById } from '../usecases'
import { makeGetProjectControllerValidation } from '../validations'

export const makeGetProjectController = (): GetProjectController => {
  const getProjectById = makeDbGetProjectById()
  const getProjectControllerValidation = makeGetProjectControllerValidation()
  return new GetProjectController(getProjectById, getProjectControllerValidation)
}
