import { UpdateTimeController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, ok, notFound } from '../../../src/domain/helpers'
import { UpdateTime, UpdateTimeParams } from '../../../src/domain/contracts'
import { mockUpdateTime } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest: UpdateTimeParams = {
  id: '1',
  project_id: '1',
  user_id: '1',
  started_at: '2023-04-13T14:00:00.704Z',
  ended_at: '2023-04-13T15:00:00.704Z'
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
  test('Should return 404 if updateTime throws 404 user not found', async () => {
    const { sut, updateTimeStub } = makeSut()
    jest.spyOn(updateTimeStub, 'update').mockImplementationOnce(async () => (await Promise.reject(notFound(new Error(`User not found with id ${mockRequest.user_id}`)))))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound(new Error(`User not found with id ${mockRequest.user_id}`)))
  })
  test('Should return 404 if updateTime throws 404 project not found', async () => {
    const { sut, updateTimeStub } = makeSut()
    jest.spyOn(updateTimeStub, 'update').mockImplementationOnce(async () => (await Promise.reject(notFound(new Error(`Project not found with id ${mockRequest.project_id}`)))))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound(new Error(`Project not found with id ${mockRequest.project_id}`)))
  })
  test('Should return 404 if updateTime throws 404 time not found', async () => {
    const { sut, updateTimeStub } = makeSut()
    jest.spyOn(updateTimeStub, 'update').mockImplementationOnce(async () => (await Promise.reject(notFound(new Error(`Time not found with id ${mockRequest.id}`)))))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound(new Error(`Time not found with id ${mockRequest.id}`)))
  })
  test('Should return 200 on success', async () => {
    const { sut, updateTimeStub } = makeSut()
    const spyUpdate = jest.spyOn(updateTimeStub, 'update')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyUpdate.mock.results[0].value))
  })
})
