import { Controller } from '../../presentation/protocols'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.query || {}),
      ...(req.body || {}),
      ...(req.params || {})
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else if (httpResponse.statusCode >= 400 && httpResponse.statusCode <= 499) {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    } else {
      res.status(500).json({
        error: httpResponse
      })
    }
  }
}
