/* eslint-disable prefer-promise-reject-errors */
import { GetProjectController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, serverError, ok, notFound } from '../../../src/presentation/helpers'
import { ServerError } from '../../../src/presentation/errors'
import { GetProjectById } from '../../../src/domain/contracts'
import { mockGetProjectById } from '../../domain/mocks'
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
  const sut = new GetProjectController(getProjectByIdStub, validationStub)
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
    jest.spyOn(getProjectByIdStub, 'get').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 404, data: 'Project not found' })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound('Project not found'))
  })
  test('Should return 500 if getProjectById throws 500', async () => {
    const { sut, getProjectByIdStub } = makeSut()
    jest.spyOn(getProjectByIdStub, 'get').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 500, data: new Error() })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, getProjectByIdStub } = makeSut()
    const spyGet = jest.spyOn(getProjectByIdStub, 'get')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyGet.mock.results[0].value))
  })
})