import { GetTimesController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, ok } from '../../../src/domain/helpers'
import { GetTimesByProjectId } from '../../../src/domain/contracts'
import { mockGetTimesByProjectId, mockFakeLogger } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest = { projectId: '1' }

interface SutTypes {
  sut: GetTimesController
  getTimesByProjectIdStub: GetTimesByProjectId
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const getTimesByProjectIdStub = mockGetTimesByProjectId()
  const validationStub = mockValidationStub()
  const fakeLogger = mockFakeLogger()
  const sut = new GetTimesController(getTimesByProjectIdStub, validationStub, fakeLogger)
  return { sut, getTimesByProjectIdStub, validationStub }
}

describe('GetTimesController', () => {
  test('Should call getTimesByProjectId with correct params', async () => {
    const { sut, getTimesByProjectIdStub } = makeSut()
    const spyGet = jest.spyOn(getTimesByProjectIdStub, 'get')
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
  test('Should return 200 on success', async () => {
    const { sut, getTimesByProjectIdStub } = makeSut()
    const spyGet = jest.spyOn(getTimesByProjectIdStub, 'get')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyGet.mock.results[0].value))
  })
})
