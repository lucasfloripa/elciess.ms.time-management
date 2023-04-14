import { GetProjectsController } from '../../../src/presentation/controllers'
import { ok, notFound } from '../../../src/domain/helpers'
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
    jest.spyOn(getProjectsStub, 'getAll').mockImplementationOnce(async () => (await Promise.reject(notFound(new Error('Projects not found')))))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(notFound(new Error('Projects not found')))
  })
  test('Should return 200 on success', async () => {
    const { sut, getProjectsStub } = makeSut()
    const spyGet = jest.spyOn(getProjectsStub, 'getAll')
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(await spyGet.mock.results[0].value))
  })
})
