import { UpdateUser, UpdateUserParams } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateUserController implements Controller {
  constructor (
    private readonly updateUser: UpdateUser,
    private readonly validation: Validation
  ) {}

  async handle (request: UpdateUserParams): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const user = await this.updateUser.update(request)
      return ok(user)
    } catch (error) {
      return error
    }
  }
}
