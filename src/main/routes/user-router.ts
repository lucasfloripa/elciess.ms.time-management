import { adaptRoute } from '../../main/adapters'
import { makeCreateUserController, makeGetUserController, makeUpdateUserController } from '../factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeCreateUserController()))
  router.get('/users/:id', adaptRoute(makeGetUserController()))
  router.put('/users/:id', adaptRoute(makeUpdateUserController()))
}