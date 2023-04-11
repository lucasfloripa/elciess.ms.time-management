export interface Controller {
  handle: (request: any) => Promise<HttpResponse>
}

export interface HttpResponse {
  statusCode: number
  body: any
}
