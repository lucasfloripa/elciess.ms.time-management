import { adaptRoute, adaptMiddleware } from '../../main/adapters'
import { makeCreateUserController, makeGetUserController, makeUpdateUserController, makeAuthenticationController } from '../factories/controllers'

import { Router } from 'express'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeCreateUserController()))
  router.get('/users/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeGetUserController()))
  router.put('/users/:id', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateUserController()))
  router.post('/authenticate', adaptRoute(makeAuthenticationController()))
}
