/* eslint-disable prefer-promise-reject-errors */
import { GetTimesController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, serverError, ok, notFound } from '../../../src/presentation/helpers'
import { ServerError } from '../../../src/presentation/errors'
import { GetTimesByProjectId } from '../../../src/domain/contracts'
import { mockGetTimesByProjectId } from '../../domain/mocks'
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
  const sut = new GetTimesController(getTimesByProjectIdStub, validationStub)
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
  test('Should return 404 if getTimesByProjectId throws 404', async () => {
    const { sut, getTimesByProjectIdStub } = makeSut()
    jest.spyOn(getTimesByProjectIdStub, 'get').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 404, data: `Times not found for project ${mockRequest.projectId}` })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound(`Times not found for project ${mockRequest.projectId}`))
  })
  test('Should return 500 if getTimesByProjectId throws 500', async () => {
    const { sut, getTimesByProjectIdStub } = makeSut()
    jest.spyOn(getTimesByProjectIdStub, 'get').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 500, data: new Error() })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, getTimesByProjectIdStub } = makeSut()
    const spyGet = jest.spyOn(getTimesByProjectIdStub, 'get')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyGet.mock.results[0].value))
  })
})
