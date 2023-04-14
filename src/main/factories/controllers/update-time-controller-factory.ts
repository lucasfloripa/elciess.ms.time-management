import { UpdateTimeController } from '../../../presentation/controllers'
import { makeDbUpdateTime } from '../usecases'
import { makeUpdateTimeControllerValidation } from '../validations'

export const makeUpdateTimeController = (): UpdateTimeController => {
  const updateTime = makeDbUpdateTime()
  const updateTimeControllerValidation = makeUpdateTimeControllerValidation()
  return new UpdateTimeController(updateTime, updateTimeControllerValidation)
}
