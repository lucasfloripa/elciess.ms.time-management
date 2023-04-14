import { UpdateUserController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, ok, notFound } from '../../../src/domain/helpers'
import { UpdateUser, UpdateUserParams } from '../../../src/domain/contracts'
import { mockUpdateUser, mockFakeLogger } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest: UpdateUserParams = {
  id: 'any-id',
  name: 'any-name',
  email: 'any-email',
  password: 'any-password'
}

interface SutTypes {
  sut: UpdateUserController
  updateUserStub: UpdateUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateUserStub = mockUpdateUser()
  const validationStub = mockValidationStub()
  const fakeLogger = mockFakeLogger()
  const sut = new UpdateUserController(updateUserStub, validationStub, fakeLogger)
  return { sut, updateUserStub, validationStub }
}

describe('UpdateUserController', () => {
  test('Should call updateUser with correct params', async () => {
    const { sut, updateUserStub } = makeSut()
    const spyUpdate = jest.spyOn(updateUserStub, 'update')
    await sut.handle(mockRequest)
    expect(spyUpdate).toHaveBeenCalledWith(mockRequest)
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
  test('Should return 404 if updateUser throws 404', async () => {
    const { sut, updateUserStub } = makeSut()
    jest.spyOn(updateUserStub, 'update').mockImplementationOnce(async () => (await Promise.reject(notFound(new Error(`User not found with id ${mockRequest.id}`)))))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound(new Error(`User not found with id ${mockRequest.id}`)))
  })

  test('Should return 200 on success', async () => {
    const { sut, updateUserStub } = makeSut()
    const spyUpdate = jest.spyOn(updateUserStub, 'update')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyUpdate.mock.results[0].value))
  })
})
