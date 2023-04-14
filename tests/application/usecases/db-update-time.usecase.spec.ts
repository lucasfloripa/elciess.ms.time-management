import { DbUpdateTimeUseCase } from '../../../src/application/usecases'
import { TimeRepository, UserRepository, ProjectRepository } from '../../../src/application/protocols'
import { UpdateTimeParams } from '../../../src/domain/contracts'
import { mockProjectRepository, mockTimeRepository, mockUserRepository } from '../../application/mocks'

const mockRequest: UpdateTimeParams = {
  id: '1',
  user_id: '1',
  project_id: '1',
  started_at: '2023-04-13T14:00:00.704Z',
  ended_at: '2023-04-13T15:00:00.704Z'
}

interface SutTypes {
  sut: DbUpdateTimeUseCase
  timeRepositoryStub: TimeRepository
  userRepositoryStub: UserRepository
  projectRepositoryStub: ProjectRepository
}

const makeSut = (): SutTypes => {
  const timeRepositoryStub = mockTimeRepository()
  const userRepositoryStub = mockUserRepository()
  const projectRepositoryStub = mockProjectRepository()
  const sut = new DbUpdateTimeUseCase(timeRepositoryStub, userRepositoryStub, projectRepositoryStub)
  return { sut, timeRepositoryStub, userRepositoryStub, projectRepositoryStub }
}

describe('DbUpdateTimeUseCase', () => {
  test('Should call timeRepository.update() with correct params', async () => {
    const { sut, timeRepositoryStub } = makeSut()
    const spyGetById = jest.spyOn(timeRepositoryStub, 'update')
    await sut.update(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith(mockRequest)
  })
  test('Should throw if timeRepository.update() throws', async () => {
    const { sut, timeRepositoryStub } = makeSut()
    jest.spyOn(timeRepositoryStub, 'update').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should call userRepository.getById() with correct params', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const spyGetById = jest.spyOn(userRepositoryStub, 'getById')
    await sut.update(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith(mockRequest.user_id)
  })
  test('Should throw if userRepository.getById() throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should call projectRepository.getById() with correct params', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    const spyGetById = jest.spyOn(projectRepositoryStub, 'getById')
    await sut.update(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith(mockRequest.project_id)
  })
  test('Should throw if projectRepository.getById() throws', async () => {
    const { sut, projectRepositoryStub } = makeSut()
    jest.spyOn(projectRepositoryStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = sut.update(mockRequest)
    expect(isValid).toBeTruthy()
  })
})
