import { CreateTimeController } from '../../../presentation/controllers'
import { makeDbCreateTime } from '../usecases'
import { makeCreateTimeControllerValidation } from '../validations'

export const makeCreateTimeController = (): CreateTimeController => {
  const createTime = makeDbCreateTime()
  const createTimeControllerValidation = makeCreateTimeControllerValidation()
  return new CreateTimeController(createTime, createTimeControllerValidation)
}
