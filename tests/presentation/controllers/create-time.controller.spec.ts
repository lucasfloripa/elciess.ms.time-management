/* eslint-disable prefer-promise-reject-errors */
import { CreateTimeController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, serverError, ok, notFound } from '../../../src/presentation/helpers'
import { ServerError } from '../../../src/presentation/errors'
import { CreateTime } from '../../../src/domain/contracts'
import { mockCreateTime } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest = {
  project_id: '1',
  user_id: '1'
}

interface SutTypes {
  sut: CreateTimeController
  createTimeStub: CreateTime
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createTimeStub = mockCreateTime()
  const validationStub = mockValidationStub()
  const sut = new CreateTimeController(createTimeStub, validationStub)
  return { sut, createTimeStub, validationStub }
}

describe('CreateTimeController', () => {
  test('Should call createTime with correct params', async () => {
    const { sut, createTimeStub } = makeSut()
    const spyCreate = jest.spyOn(createTimeStub, 'create')
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
  test('Should return 404 if createTime throws 404 User not found', async () => {
    const { sut, createTimeStub } = makeSut()
    jest.spyOn(createTimeStub, 'create').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 404, data: 'User not found' })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound('User not found'))
  })
  test('Should return 404 if createTime throws 404 Project not found', async () => {
    const { sut, createTimeStub } = makeSut()
    jest.spyOn(createTimeStub, 'create').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 404, data: 'Project not found' })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound('Project not found'))
  })
  test('Should return 500 if createTime throws 500', async () => {
    const { sut, createTimeStub } = makeSut()
    jest.spyOn(createTimeStub, 'create').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 500, data: new Error() })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, createTimeStub } = makeSut()
    const spyCreate = jest.spyOn(createTimeStub, 'create')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyCreate.mock.results[0].value))
  })
})
