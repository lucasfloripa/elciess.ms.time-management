import { GetProjectController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, ok, notFound } from '../../../src/domain/helpers'
import { GetProjectById } from '../../../src/domain/contracts'
import { mockGetProjectById, mockFakeLogger } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest = { id: '1' }

interface SutTypes {
  sut: GetProjectController
  getProjectByIdStub: GetProjectById
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const getProjectByIdStub = mockGetProjectById()
  const validationStub = mockValidationStub()
  const fakeLogger = mockFakeLogger()
  const sut = new GetProjectController(getProjectByIdStub, validationStub, fakeLogger)
  return { sut, getProjectByIdStub, validationStub }
}

describe('GetProjectController', () => {
  test('Should call getProjectById with correct params', async () => {
    const { sut, getProjectByIdStub } = makeSut()
    const spyGet = jest.spyOn(getProjectByIdStub, 'get')
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
  test('Should return 404 if getProjectById throws 404', async () => {
    const { sut, getProjectByIdStub } = makeSut()
    jest.spyOn(getProjectByIdStub, 'get').mockImplementationOnce(async () => (await Promise.reject(notFound(new Error(`Project not found with id ${mockRequest.id}`)))))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound(new Error(`Project not found with id ${mockRequest.id}`)))
  })
  test('Should return 200 on success', async () => {
    const { sut, getProjectByIdStub } = makeSut()
    const spyGet = jest.spyOn(getProjectByIdStub, 'get')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyGet.mock.results[0].value))
  })
})
