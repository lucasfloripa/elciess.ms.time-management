import { GetUserController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, ok, notFound } from '../../../src/domain/helpers'
import { GetUserById } from '../../../src/domain/contracts'
import { mockGetUserById, mockFakeLogger } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest = { id: '1' }

interface SutTypes {
  sut: GetUserController
  getUserByIdStub: GetUserById
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const getUserByIdStub = mockGetUserById()
  const validationStub = mockValidationStub()
  const fakeLogger = mockFakeLogger()
  const sut = new GetUserController(getUserByIdStub, validationStub, fakeLogger)
  return { sut, getUserByIdStub, validationStub }
}

describe('GetUserController', () => {
  test('Should call getUserById with correct params', async () => {
    const { sut, getUserByIdStub } = makeSut()
    const spyGet = jest.spyOn(getUserByIdStub, 'get')
    await sut.handle(mockRequest)
    expect(spyGet).toHaveBeenCalledWith('1')
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
  test('Should return 404 if getUserById throws 404', async () => {
    const { sut, getUserByIdStub } = makeSut()
    jest.spyOn(getUserByIdStub, 'get').mockImplementationOnce(async () => (await Promise.reject(notFound(new Error(`User not found with id ${mockRequest.id}`)))))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound(new Error(`User not found with id ${mockRequest.id}`)))
  })
  test('Should return 200 on success', async () => {
    const { sut, getUserByIdStub } = makeSut()
    const spyGet = jest.spyOn(getUserByIdStub, 'get')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyGet.mock.results[0].value))
  })
})
