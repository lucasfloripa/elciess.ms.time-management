import { UpdateTimeController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, serverError, ok, notFound } from '../../../src/presentation/helpers'
import { ServerError } from '../../../src/presentation/errors'
import { UpdateTime } from '../../../src/domain/contracts'
import { mockUpdateTime } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest = {
  timeId: 'any-id',
  name: 'any-name'
}

interface SutTypes {
  sut: UpdateTimeController
  updateTimeStub: UpdateTime
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateTimeStub = mockUpdateTime()
  const validationStub = mockValidationStub()
  const sut = new UpdateTimeController(updateTimeStub, validationStub)
  return { sut, updateTimeStub, validationStub }
}

describe('UpdateTimeController', () => {
  test('Should call updateTime with correct params', async () => {
    const { sut, updateTimeStub } = makeSut()
    const spyUpdate = jest.spyOn(updateTimeStub, 'update')
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
  test('Should return 404 if updateTime throws 404', async () => {
    const { sut, updateTimeStub } = makeSut()
    jest.spyOn(updateTimeStub, 'update').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 404, data: 'Time not found' })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound('Time not found'))
  })
  test('Should return 500 if updateTime throws 500', async () => {
    const { sut, updateTimeStub } = makeSut()
    jest.spyOn(updateTimeStub, 'update').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 500, data: new Error() })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, updateTimeStub } = makeSut()
    const spyUpdate = jest.spyOn(updateTimeStub, 'update')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyUpdate.mock.results[0].value))
  })
})
