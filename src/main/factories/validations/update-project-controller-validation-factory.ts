import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '../../../utils/validators'

export const makeUpdateProjectControllerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'title', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
