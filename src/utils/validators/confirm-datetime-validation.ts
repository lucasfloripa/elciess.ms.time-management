import { Validation } from '../../presentation/protocols'
import { InvalidParamError } from '../../domain/errors'

export class ConfirmDateTimeValidation implements Validation {
  validate (input: any): Error | undefined {
    if (new Date(input.started_at) > new Date(input.ended_at)) {
      return new InvalidParamError('started_at greater than ended_at')
    }
  }
}
