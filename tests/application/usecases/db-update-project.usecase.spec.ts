import { DbUpdateProjectUseCase } from '../../../src/application/usecases'
import { ProjectRepository } from '../../../src/application/protocols'
import { UpdateProjectParams } from '../../../src/domain/contracts'
import { mockProjectRepository } from '../../application/mocks'

const mockRequest: UpdateProjectParams = {
  id: '1',
  description: 'any_description',
  title: 'any_title'
}

interface SutTypes {
  sut: DbUpdateProjectUseCase
  projectRepositoryStub: ProjectRepository
}

const makeSut = (): SutTypes => {
  const projectRepositoryStub = mockProjectRepository()
  const sut = new DbUpdateProjectUseCase(projectRepositoryStub)
  return { sut, projectRepositoryStub }
}

describe('DbUpdateProjectUseCase', () => {
  test('Should call projectRepository.update() with correct params', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    const spyGetById = jest.spyOn(projectRepositoryStub, 'update')
    await sut.update(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith(mockRequest)
  })
  test('Should throw if projectRepository.update() throws', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    jest.spyOn(projectRepositoryStub, 'update').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = sut.update(mockRequest)
    expect(isValid).toBeTruthy()
  })
})
