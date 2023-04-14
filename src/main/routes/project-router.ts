import { adaptRoute } from '../../main/adapters'
import { makeCreateProjectController, makeGetProjectsController, makeGetProjectController, makeUpdateProjectController } from '../factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/projects', adaptRoute(makeCreateProjectController()))
  router.get('/projects', adaptRoute(makeGetProjectsController()))
  router.get('/projects/:id', adaptRoute(makeGetProjectController()))
  router.put('/projects/:id', adaptRoute(makeUpdateProjectController()))
}
