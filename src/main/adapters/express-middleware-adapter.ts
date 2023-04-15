import { Middleware } from '../../../src/presentation/protocols'

import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {})
    }
    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
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
