import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '../../../utils/validators'

export const makeAuthenticationControllerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
