import { InvalidParamError } from '../../domain/errors'
import { Validation } from '../../presentation/protocols'
import { EmailValidator } from '../../utils/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly email: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | undefined {
    const isValid = this.emailValidator.isValid(input[this.email])
    if (!isValid) {
      return new InvalidParamError('email in wrong format')
    }
  }
}
