import { HttpResponse } from '../../presentation/protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (message: string): HttpResponse => ({
  statusCode: 403,
  body: message
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (data?: any): HttpResponse => ({
  statusCode: 204,
  body: data
})
