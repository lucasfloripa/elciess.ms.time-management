import { CreateTimeController } from '../../../presentation/controllers'
import { WinstonLogger } from '../../../utils/logger'
import { makeDbCreateTime } from '../usecases'
import { makeCreateTimeControllerValidation } from '../validations'

export const makeCreateTimeController = (): CreateTimeController => {
  const logger = new WinstonLogger()
  const createTime = makeDbCreateTime()
  const createTimeControllerValidation = makeCreateTimeControllerValidation()
  return new CreateTimeController(createTime, createTimeControllerValidation, logger)
}
