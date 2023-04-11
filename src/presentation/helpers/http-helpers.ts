import { HttpResponse } from '../protocols'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (message: string): HttpResponse => ({
  statusCode: 403,
  body: message
})

export const notFound = (message: string): HttpResponse => ({
  statusCode: 404,
  body: message
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const exceptionHandler = (exception: { statusCode: number, data: any }): any => {
  switch (exception.statusCode) {
    case 403:
      return forbidden(exception.data)
    case 404:
      return notFound(exception.data)
    case 500:
      return serverError(exception.data)
  }
}
