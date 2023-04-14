import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '../../../utils/validators'

export const makeGetProjectControllerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
