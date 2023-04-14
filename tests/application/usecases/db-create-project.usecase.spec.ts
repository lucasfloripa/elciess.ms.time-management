import { DbCreateProjectUseCase } from '../../../src/application/usecases'
import { ProjectRepository, IdGenerator } from '../../../src/application/protocols'
import { CreateProjectParams } from '../../../src/domain/contracts'
import { mockProjectRepository, mockIdGenerator } from '../../application/mocks'
import { mockFakeLogger } from '../../domain/mocks'

const mockRequest: CreateProjectParams = {
  description: 'any-description',
  title: 'any-title'
}

interface SutTypes {
  sut: DbCreateProjectUseCase
  projectRepositoryStub: ProjectRepository
  idGeneratorStub: IdGenerator
}

const makeSut = (): SutTypes => {
  const projectRepositoryStub = mockProjectRepository()
  const idGeneratorStub = mockIdGenerator()
  const fakeLogger = mockFakeLogger()
  const sut = new DbCreateProjectUseCase(projectRepositoryStub, idGeneratorStub, fakeLogger)
  return { sut, projectRepositoryStub, idGeneratorStub }
}

describe('DbCreateProjectUseCase', () => {
  test('Should call idGenerator correctly', async () => {
    const { sut, idGeneratorStub } = makeSut()
    const spyGenerate = jest.spyOn(idGeneratorStub, 'generate')
    await sut.create(mockRequest)
    expect(spyGenerate).toHaveBeenCalled()
  })
  test('Should throw if idGenerator throws', async () => {
    const { sut, idGeneratorStub } = makeSut()
    jest.spyOn(idGeneratorStub, 'generate').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.create(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should call projectRepository.create() with correct params', async () => {
    const { sut, idGeneratorStub, projectRepositoryStub } = makeSut()
    const spyCreate = jest.spyOn(projectRepositoryStub, 'create')
    const spyGenerate = jest.spyOn(idGeneratorStub, 'generate')
    await sut.create(mockRequest)
    expect(spyCreate).toHaveBeenCalledWith({
      id: await spyGenerate.mock.results[0].value,
      title: mockRequest.title,
      description: mockRequest.description
    })
  })
  test('Should throw if projectRepository throws', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    jest.spyOn(projectRepositoryStub, 'create').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.create(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = sut.create(mockRequest)
    expect(isValid).toBeTruthy()
  })
})
