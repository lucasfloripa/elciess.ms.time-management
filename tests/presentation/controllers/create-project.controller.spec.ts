/* eslint-disable prefer-promise-reject-errors */
import { CreateProjectController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, serverError, ok } from '../../../src/presentation/helpers'
import { ServerError } from '../../../src/presentation/errors'
import { CreateProject } from '../../../src/domain/contracts'
import { mockCreateProject } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest = {
  title: 'any-title',
  description: 'any-description'
}

interface SutTypes {
  sut: CreateProjectController
  createProjectStub: CreateProject
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createProjectStub = mockCreateProject()
  const validationStub = mockValidationStub()
  const sut = new CreateProjectController(createProjectStub, validationStub)
  return { sut, createProjectStub, validationStub }
}

describe('CreateProjectController', () => {
  test('Should call createProject with correct params', async () => {
    const { sut, createProjectStub } = makeSut()
    const spyCreate = jest.spyOn(createProjectStub, 'create')
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
  test('Should return 500 if createProject throws 500', async () => {
    const { sut, createProjectStub } = makeSut()
    jest.spyOn(createProjectStub, 'create').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 500, data: new Error() })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, createProjectStub } = makeSut()
    const spyCreate = jest.spyOn(createProjectStub, 'create')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyCreate.mock.results[0].value))
  })
})
