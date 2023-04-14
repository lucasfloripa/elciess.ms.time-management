import { CreateUserController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, ok } from '../../../src/domain/helpers'
import { EmailInUseError } from '../../../src/domain/errors'
import { CreateUser, CreateUserParams } from '../../../src/domain/contracts'
import { mockCreateUser, mockFakeLogger } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest: CreateUserParams = {
  name: 'any-name',
  password: 'any-password',
  email: 'any-email'
}

interface SutTypes {
  sut: CreateUserController
  createUserStub: CreateUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createUserStub = mockCreateUser()
  const validationStub = mockValidationStub()
  const fakeLogger = mockFakeLogger()
  const sut = new CreateUserController(createUserStub, validationStub, fakeLogger)
  return { sut, createUserStub, validationStub }
}

describe('CreateUserController', () => {
  test('Should call createUser with correct params', async () => {
    const { sut, createUserStub } = makeSut()
    const spyCreate = jest.spyOn(createUserStub, 'create')
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
  test('Should return 400 if createUser throws 400', async () => {
    const { sut, createUserStub } = makeSut()
    jest.spyOn(createUserStub, 'create').mockImplementationOnce(async () => (await Promise.reject(badRequest(new EmailInUseError()))))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new EmailInUseError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, createUserStub } = makeSut()
    const spyCreate = jest.spyOn(createUserStub, 'create')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyCreate.mock.results[0].value))
  })
})
