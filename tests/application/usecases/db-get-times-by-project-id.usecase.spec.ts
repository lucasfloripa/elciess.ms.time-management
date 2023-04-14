import { DbGetTimesByProjectId } from '../../../src/application/usecases'
import { TimeRepository } from '../../../src/application/protocols'
import { mockTimeRepository } from '../../application/mocks'

const mockRequest = '1'

interface SutTypes {
  sut: DbGetTimesByProjectId
  timeRepositoryStub: TimeRepository
}

const makeSut = (): SutTypes => {
  const timeRepositoryStub = mockTimeRepository()
  const sut = new DbGetTimesByProjectId(timeRepositoryStub)
  return { sut, timeRepositoryStub }
}

describe('DbGetTimesByProjectId', () => {
  test('Should call timeRepository.getAllByProjectId with correct params', async () => {
    const { sut, timeRepositoryStub } = makeSut()
    const spyGet = jest.spyOn(timeRepositoryStub, 'getAllByProjectId')
    await sut.get(mockRequest)
    expect(spyGet).toHaveBeenCalledWith(mockRequest)
  })
  test('Should throw if timeRepository throws', async () => {
    const { sut, timeRepositoryStub } = makeSut()
    jest.spyOn(timeRepositoryStub, 'getAllByProjectId').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const times = sut.get(mockRequest)
    await expect(times).rejects.toThrow()
  })
  test('Should return times on success', async () => {
    const { sut } = makeSut()
    const times = sut.get(mockRequest)
    expect(times).toBeTruthy()
  })
})
