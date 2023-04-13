import { UpdateProjectController } from '../../../src/presentation/controllers'
import { Validation } from '../../../src/presentation/protocols'
import { badRequest, serverError, ok, notFound } from '../../../src/presentation/helpers'
import { ServerError } from '../../../src/presentation/errors'
import { UpdateProject, UpdateProjectParams } from '../../../src/domain/contracts'
import { mockUpdateProject } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest: UpdateProjectParams = {
  id: 'any-id',
  title: 'any-title',
  description: 'any-description'
}

interface SutTypes {
  sut: UpdateProjectController
  updateProjectStub: UpdateProject
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateProjectStub = mockUpdateProject()
  const validationStub = mockValidationStub()
  const sut = new UpdateProjectController(updateProjectStub, validationStub)
  return { sut, updateProjectStub, validationStub }
}

describe('UpdateProjectController', () => {
  test('Should call updateProject with correct params', async () => {
    const { sut, updateProjectStub } = makeSut()
    const spyUpdate = jest.spyOn(updateProjectStub, 'update')
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
    const { sut, updateProjectStub } = makeSut()
    jest.spyOn(updateProjectStub, 'update').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 404, data: 'Project not found' })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound('Project not found'))
  })
  test('Should return 500 if updateProject throws 500', async () => {
    const { sut, updateProjectStub } = makeSut()
    jest.spyOn(updateProjectStub, 'update').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 500, data: new Error() })))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, updateProjectStub } = makeSut()
    const spyUpdate = jest.spyOn(updateProjectStub, 'update')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok(await spyUpdate.mock.results[0].value))
  })
})
