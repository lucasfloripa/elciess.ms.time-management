import { DbUpdateTimeUseCase } from '../../../src/application/usecases'
import { TimeRepository } from '../../../src/application/protocols'
import { UpdateTimeParams } from '../../../src/domain/contracts'
import { mockTimeRepository } from '../../application/mocks'

const mockRequest: UpdateTimeParams = {
  timeId: '1'
}

interface SutTypes {
  sut: DbUpdateTimeUseCase
  timeRepositoryStub: TimeRepository
}

const makeSut = (): SutTypes => {
  const timeRepositoryStub = mockTimeRepository()
  const sut = new DbUpdateTimeUseCase(timeRepositoryStub)
  return { sut, timeRepositoryStub }
}

describe('DbUpdateTimeUseCase', () => {
  test('Should call timeRepository.getById() with correct params', async () => {
    const { sut, timeRepositoryStub } = makeSut()
    const spyGetById = jest.spyOn(timeRepositoryStub, 'getById')
    await sut.update(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith('1')
  })
  test('Should throw if timeRepository.getById() throws', async () => {
    const { sut, timeRepositoryStub } = makeSut()
    jest.spyOn(timeRepositoryStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should call timeRepository.update() with correct params', async () => {
    const { sut, timeRepositoryStub } = makeSut()
    const { timeId, ...rest } = mockRequest
    const spyGetById = jest.spyOn(timeRepositoryStub, 'update')
    await sut.update(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith({
      id: timeId,
      ...rest
    })
  })
  test('Should throw if timeRepository.update() throws', async () => {
    const { sut, timeRepositoryStub } = makeSut()
    jest.spyOn(timeRepositoryStub, 'update').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = sut.update(mockRequest)
    expect(isValid).toBeTruthy()
  })
})
