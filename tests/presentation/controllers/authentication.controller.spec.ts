import { AuthenticationController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, ok } from '../../../src/domain/helpers'
import { Authenticate, AuthenticateParams } from '../../../src/domain/contracts'
import { mockAuthentication, mockFakeLogger } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest: AuthenticateParams = {
  email: 'mail@mail.com',
  password: '123'
}

interface SutTypes {
  sut: AuthenticationController
  authenticateStub: Authenticate
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticateStub = mockAuthentication()
  const validationStub = mockValidationStub()
  const fakeLogger = mockFakeLogger()
  const sut = new AuthenticationController(validationStub, authenticateStub, fakeLogger)
  return { sut, authenticateStub, validationStub }
}

describe('AuthenticationController', () => {
  test('Should call authenticate with correct params', async () => {
    const { sut, authenticateStub } = makeSut()
    const spyCreate = jest.spyOn(authenticateStub, 'auth')
    await sut.handle(mockRequest)
    expect(spyCreate).toHaveBeenCalledWith(mockRequest)
  })
  test('Should call validation with correct params', async () => {
    const { sut, validationStub } = makeSut()
    const spyValidation = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest)
    expect(spyValidation).toHaveBeenCalledWith(mockRequest)
  })
  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should return 200 on success', async () => {
    const { sut, authenticateStub } = makeSut()
    const spyCreate = jest.spyOn(authenticateStub, 'auth')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyCreate.mock.results[0].value))
  })
})
