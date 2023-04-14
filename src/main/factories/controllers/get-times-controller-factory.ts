import { GetTimesController } from '../../../presentation/controllers'
import { makeDbGetTimesByProjectId } from '../usecases'
import { makeGetTimesControllerValidation } from '../validations'

export const makeGetTimesController = (): GetTimesController => {
  const getTimesByProjectId = makeDbGetTimesByProjectId()
  const getTimesControllerValidation = makeGetTimesControllerValidation()
  return new GetTimesController(getTimesByProjectId, getTimesControllerValidation)
}
