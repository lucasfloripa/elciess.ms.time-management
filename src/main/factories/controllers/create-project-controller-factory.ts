import { CreateProjectController } from '../../../presentation/controllers'
import { makeDbCreateProject } from '../usecases'
import { makeCreateProjectControllerValidation } from '../validations'

export const makeCreateProjectController = (): CreateProjectController => {
  const createProject = makeDbCreateProject()
  const createProjectControllerValidation = makeCreateProjectControllerValidation()
  return new CreateProjectController(createProject, createProjectControllerValidation)
}
