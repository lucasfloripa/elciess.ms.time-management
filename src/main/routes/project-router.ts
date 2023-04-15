import { adaptMiddleware, adaptRoute } from '../../main/adapters'
import { makeCreateProjectController, makeGetProjectsController, makeGetProjectController, makeUpdateProjectController } from '../factories/controllers'

import { Router } from 'express'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export default (router: Router): void => {
  router.post('/projects', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateProjectController()))
  router.get('/projects', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetProjectsController()))
  router.get('/projects/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetProjectController()))
  router.put('/projects/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateProjectController()))
}
