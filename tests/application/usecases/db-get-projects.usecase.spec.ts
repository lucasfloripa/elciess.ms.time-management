import { DbGetProjects } from '../../../src/application/usecases'
import { ProjectRepository } from '../../../src/application/protocols'
import { mockProjectRepository } from '../../application/mocks'

interface SutTypes {
  sut: DbGetProjects
  projectRepositoryStub: ProjectRepository
}

const makeSut = (): SutTypes => {
  const projectRepositoryStub = mockProjectRepository()
  const sut = new DbGetProjects(projectRepositoryStub)
  return { sut, projectRepositoryStub }
}

describe('DbGetProjects', () => {
  test('Should call projectRepository.getAll with correct params', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    const spyGet = jest.spyOn(projectRepositoryStub, 'getAll')
    await sut.getAll()
    expect(spyGet).toHaveBeenCalledWith()
  })
  // test('Should return null if projectRepositoryStub.getById returns not found times', async () => {
  //   const { sut, projectRepositoryStub } = makeSut()
  //   jest.spyOn(projectRepositoryStub, 'getById').mockReturnValueOnce(Promise.resolve(null))
  //   const times = await sut.get()
  //   expect(times).toBe(null)
  // })
  test('Should throw if projectRepository throws', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    jest.spyOn(projectRepositoryStub, 'getAll').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const times = sut.getAll()
    await expect(times).rejects.toThrow()
  })
  test('Should return times on success', async () => {
    const { sut } = makeSut()
    const times = sut.getAll()
    expect(times).toBeTruthy()
  })
})
