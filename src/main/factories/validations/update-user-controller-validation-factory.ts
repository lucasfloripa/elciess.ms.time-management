import { EmailValidatorAdapter } from '../../../infra/validators'
import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../utils/validators'

export const makeUpdateUserControllerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'name', 'email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
