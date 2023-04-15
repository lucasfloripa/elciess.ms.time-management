import { adaptMiddleware, adaptRoute } from '../../main/adapters'
import { makeCreateTimeController, makeGetTimesController, makeUpdateTimeController } from '../factories/controllers'

import { Router } from 'express'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export default (router: Router): void => {
  router.post('/times', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateTimeController()))
  router.get('/times/:projectId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetTimesController()))
  router.put('/times/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateTimeController()))
}
