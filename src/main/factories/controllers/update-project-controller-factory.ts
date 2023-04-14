import { UpdateProjectController } from '../../../presentation/controllers'
import { makeDbUpdateProject } from '../usecases'
import { makeUpdateProjectControllerValidation } from '../validations'

export const makeUpdateProjectController = (): UpdateProjectController => {
  const updateProject = makeDbUpdateProject()
  const updateProjectControllerValidation = makeUpdateProjectControllerValidation()
  return new UpdateProjectController(updateProject, updateProjectControllerValidation)
}
