import { CreateUser, CreateUserParams } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class CreateUserController implements Controller {
  constructor (
    private readonly createUser: CreateUser,
    private readonly validation: Validation
  ) {}

  async handle (request: CreateUserParams): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const user = await this.createUser.create(request)
      return ok(user)
    } catch (error) {
      return error
    }
  }
}
