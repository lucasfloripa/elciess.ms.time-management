import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '../../../utils/validators'

export const makeGetTimesControllerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['projectId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
