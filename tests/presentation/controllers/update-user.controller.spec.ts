import { UpdateUserController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, serverError, ok, notFound } from '../../../src/presentation/helpers'
import { ServerError } from '../../../src/presentation/errors'
import { UpdateUser } from '../../../src/domain/contracts'
import { mockUpdateUser } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest = {
  userId: 'any-id',
  name: 'any-name'
}

interface SutTypes {
  sut: UpdateUserController
  updateUserStub: UpdateUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateUserStub = mockUpdateUser()
  const validationStub = mockValidationStub()
  const sut = new UpdateUserController(updateUserStub, validationStub)
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
    jest.spyOn(updateUserStub, 'update').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 404, data: 'User not found' })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound('User not found'))
  })
  test('Should return 500 if updateUser throws 500', async () => {
    const { sut, updateUserStub } = makeSut()
    jest.spyOn(updateUserStub, 'update').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 500, data: new Error() })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, updateUserStub } = makeSut()
    const spyUpdate = jest.spyOn(updateUserStub, 'update')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyUpdate.mock.results[0].value))
  })
})
