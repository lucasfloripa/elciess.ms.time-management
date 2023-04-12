import { DbUpdateUserUseCase } from '../../../src/application/usecases'
import { UserRepository } from '../../../src/application/protocols'
import { UpdateUserParams } from '../../../src/domain/contracts'
import { mockUserRepository } from '../../application/mocks'

const mockRequest: UpdateUserParams = {
  userId: '1',
  name: 'any-name'
}

interface SutTypes {
  sut: DbUpdateUserUseCase
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserRepository()
  const sut = new DbUpdateUserUseCase(userRepositoryStub)
  return { sut, userRepositoryStub }
}

describe('DbUpdateUserUseCase', () => {
  test('Should call userRepository.getById() with correct params', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const spyGetById = jest.spyOn(userRepositoryStub, 'getById')
    await sut.update(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith('1')
  })
  test('Should throw if userRepository.getById() throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should call userRepository.update() with correct params', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const { userId, ...rest } = mockRequest
    const spyGetById = jest.spyOn(userRepositoryStub, 'update')
    await sut.update(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith({
      id: userId,
      ...rest
    })
  })
  test('Should throw if userRepository.update() throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'update').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = sut.update(mockRequest)
    expect(isValid).toBeTruthy()
  })
})
