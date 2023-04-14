import { UpdateTimeController } from '../../../presentation/controllers'
import { WinstonLogger } from '../../../utils/logger'
import { makeDbUpdateTime } from '../usecases'
import { makeUpdateTimeControllerValidation } from '../validations'

export const makeUpdateTimeController = (): UpdateTimeController => {
  const logger = new WinstonLogger()
  const updateTime = makeDbUpdateTime()
  const updateTimeControllerValidation = makeUpdateTimeControllerValidation()
  return new UpdateTimeController(updateTime, updateTimeControllerValidation, logger)
}
