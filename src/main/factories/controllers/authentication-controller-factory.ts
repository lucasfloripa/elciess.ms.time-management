import { AuthenticationController } from '../../../presentation/controllers'
import { makeDbAuthentication } from '../usecases'
import { WinstonLogger } from '../../../utils/logger'
import { makeAuthenticationControllerValidation } from '../validations'

export const makeAuthenticationController = (): AuthenticationController => {
  const logger = new WinstonLogger()
  const auth = makeDbAuthentication()
  const authenticationControllerValidation = makeAuthenticationControllerValidation()
  return new AuthenticationController(authenticationControllerValidation, auth, logger)
}
