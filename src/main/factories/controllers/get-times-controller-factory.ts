import { GetTimesController } from '../../../presentation/controllers'
import { WinstonLogger } from '../../../utils/logger'
import { makeDbGetTimesByProjectId } from '../usecases'
import { makeGetTimesControllerValidation } from '../validations'

export const makeGetTimesController = (): GetTimesController => {
  const logger = new WinstonLogger()
  const getTimesByProjectId = makeDbGetTimesByProjectId()
  const getTimesControllerValidation = makeGetTimesControllerValidation()
  return new GetTimesController(getTimesByProjectId, getTimesControllerValidation, logger)
}
