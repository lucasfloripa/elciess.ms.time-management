import { GetProjectsController } from '../../../src/presentation/controllers'
import { serverError, ok, notFound } from '../../../src/presentation/helpers'
import { ServerError } from '../../../src/presentation/errors'
import { GetProjects } from '../../../src/domain/contracts'
import { mockGetProjects } from '../../domain/mocks'

interface SutTypes {
  sut: GetProjectsController
  getProjectsStub: GetProjects
}

const makeSut = (): SutTypes => {
  const getProjectsStub = mockGetProjects()
  const sut = new GetProjectsController(getProjectsStub)
  return { sut, getProjectsStub }
}

describe('GetProjectsController', () => {
  test('Should call getProjects correctly', async () => {
    const { sut, getProjectsStub } = makeSut()
    const spyGet = jest.spyOn(getProjectsStub, 'getAll')
    await sut.handle()
    expect(spyGet).toHaveBeenCalled()
  })
  test('Should return 404 if getProjects throws 404', async () => {
    const { sut, getProjectsStub } = makeSut()
    jest.spyOn(getProjectsStub, 'getAll').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 404, data: 'No project found' })))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(notFound('No project found'))
  })
  test('Should return 500 if getProjects throws 500', async () => {
    const { sut, getProjectsStub } = makeSut()
    jest.spyOn(getProjectsStub, 'getAll').mockImplementationOnce(async () => (await Promise.reject({ statusCode: 500, data: new Error() })))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, getProjectsStub } = makeSut()
    const spyGet = jest.spyOn(getProjectsStub, 'getAll')
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(await spyGet.mock.results[0].value))
  })
})
