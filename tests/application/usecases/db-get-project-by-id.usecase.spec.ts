import { DbGetProjectById } from '../../../src/application/usecases'
import { ProjectRepository } from '../../../src/application/protocols'
import { mockProjectRepository } from '../../application/mocks'

const mockRequest = '1'

interface SutTypes {
  sut: DbGetProjectById
  projectRepositoryStub: ProjectRepository
}

const makeSut = (): SutTypes => {
  const projectRepositoryStub = mockProjectRepository()
  const sut = new DbGetProjectById(projectRepositoryStub)
  return { sut, projectRepositoryStub }
}

describe('DbGetProjectById', () => {
  test('Should call projectRepository.getById with correct params', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    const spyGet = jest.spyOn(projectRepositoryStub, 'getById')
    await sut.get(mockRequest)
    expect(spyGet).toHaveBeenCalledWith(mockRequest)
  })
  test('Should throw if projectRepository throws', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    jest.spyOn(projectRepositoryStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const user = sut.get(mockRequest)
    await expect(user).rejects.toThrow()
  })
  test('Should return an user on success', async () => {
    const { sut } = makeSut()
    const user = sut.get(mockRequest)
    expect(user).toBeTruthy()
  })
})
