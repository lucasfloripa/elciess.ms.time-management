import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, ConfirmDateTimeValidation } from '../../../utils/validators'

export const makeUpdateTimeControllerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id', 'project_id', 'user_id', 'started_at', 'ended_at']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ConfirmDateTimeValidation())
  return new ValidationComposite(validations)
}
