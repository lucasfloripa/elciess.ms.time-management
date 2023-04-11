import { UpdateUser } from '../../domain/contracts'
import { badRequest, exceptionHandler, ok } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class UpdateUserController implements Controller {
  constructor (
    private readonly updateUser: UpdateUser,
    private readonly validation: Validation
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const user = await this.updateUser.update(request)
      return ok(user)
    } catch (error) {
      return exceptionHandler(error)
    }
  }
}

interface Request {
  id: string
  name?: string
  email?: string
  password?: string
  project_ids?: string[]
}
