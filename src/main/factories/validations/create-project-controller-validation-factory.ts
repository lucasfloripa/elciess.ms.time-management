import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '../../../utils/validators'

export const makeCreateProjectControllerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['title', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
