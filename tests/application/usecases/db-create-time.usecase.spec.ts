import { DbCreateTimeUseCase } from '../../../src/application/usecases'
import { TimeRepository, UserRepository, ProjectRepository, IdGenerator } from '../../../src/application/protocols'
import { CreateTimeParams } from '../../../src/domain/contracts'
import { mockProjectRepository, mockUserRepository, mockTimeRepository, mockIdGenerator } from '../../application/mocks'

const mockRequest: CreateTimeParams = {
  project_id: '1',
  user_id: '1',
  ended_at: '2023-04-13T14:00:00.704Z',
  started_at: '2023-04-13T15:00:00.704Z'
}

interface SutTypes {
  sut: DbCreateTimeUseCase
  timeRepositoryStub: TimeRepository
  projectRepositoryStub: ProjectRepository
  userRepositoryStub: UserRepository
  idGeneratorStub: IdGenerator
}

const makeSut = (): SutTypes => {
  const timeRepositoryStub = mockTimeRepository()
  const userRepositoryStub = mockUserRepository()
  const projectRepositoryStub = mockProjectRepository()
  const idGeneratorStub = mockIdGenerator()
  const sut = new DbCreateTimeUseCase(idGeneratorStub, timeRepositoryStub, userRepositoryStub, projectRepositoryStub)
  return { sut, timeRepositoryStub, idGeneratorStub, projectRepositoryStub, userRepositoryStub }
}

describe('DbCreateTimeUseCase', () => {
  test('Should call userRepository.getById correctly', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const spyGetById = jest.spyOn(userRepositoryStub, 'getById')
    await sut.create(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith('1')
  })
  test('Should throw if userRepository.getById throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.create(mockRequest)
    await expect(isValid).rejects.toThrow()
  })

  test('Should call projectRepository.getById correctly', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    const spyGetById = jest.spyOn(projectRepositoryStub, 'getById')
    await sut.create(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith('1')
  })
  test('Should throw if projectRepository.getById throws', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    jest.spyOn(projectRepositoryStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.create(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
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
  test('Should call timeRepository.create() with correct params', async () => {
    const { sut, idGeneratorStub, timeRepositoryStub } = makeSut()
    const spyCreate = jest.spyOn(timeRepositoryStub, 'create')
    const spyGenerate = jest.spyOn(idGeneratorStub, 'generate')
    await sut.create(mockRequest)
    expect(spyCreate).toHaveBeenCalledWith({
      id: await spyGenerate.mock.results[0].value,
      ...mockRequest
    })
  })
  test('Should throw if timeRepository throws', async () => {
    const { sut, timeRepositoryStub } = makeSut()
    jest.spyOn(timeRepositoryStub, 'create').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.create(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = sut.create(mockRequest)
    expect(isValid).toBeTruthy()
  })
})
