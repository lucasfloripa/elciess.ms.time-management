import { CreateUser } from '../../domain/contracts'
import { badRequest, exceptionHandler, ok } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class CreateUserController implements Controller {
  constructor (
    private readonly createUser: CreateUser,
    private readonly validation: Validation
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const user = await this.createUser.create(request)
      return ok(user)
    } catch (error) {
      return exceptionHandler(error)
    }
  }
}

interface Request {
  name: string
  password: string
  email: string
}
