import { GetUserById } from '../../domain/contracts'
import { badRequest, ok } from '../../domain/helpers'
import { Controller, HttpResponse, Validation } from '../../presentation/protocols'

export class GetUserController implements Controller {
  constructor (
    private readonly getUserById: GetUserById,
    private readonly validation: Validation
  ) {}

  async handle (request: Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const user = await this.getUserById.get(request.id)
      return ok(user)
    } catch (error) {
      return error
    }
  }
}

interface Request {
  id: string
}
