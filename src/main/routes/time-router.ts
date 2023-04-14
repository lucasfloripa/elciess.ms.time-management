import { adaptRoute } from '../../main/adapters'
import { makeCreateTimeController, makeGetTimesController, makeUpdateTimeController } from '../factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/times', adaptRoute(makeCreateTimeController()))
  router.get('/times/:projectId', adaptRoute(makeGetTimesController()))
  router.put('/times/:id', adaptRoute(makeUpdateTimeController()))
}
