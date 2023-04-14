import { DbUpdateUserUseCase } from '../../../src/application/usecases'
import { Hasher, UserRepository } from '../../../src/application/protocols'
import { UpdateUserParams } from '../../../src/domain/contracts'
import { mockHasher, mockUserRepository } from '../../application/mocks'
import { mockFakeLogger } from '../../domain/mocks'

const mockRequest: UpdateUserParams = {
  id: '1',
  name: 'any-name',
  email: 'any-email',
  password: '123'
}

interface SutTypes {
  sut: DbUpdateUserUseCase
  userRepositoryStub: UserRepository
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserRepository()
  const hasherStub = mockHasher()
  const fakeLogger = mockFakeLogger()
  const sut = new DbUpdateUserUseCase(userRepositoryStub, hasherStub, fakeLogger)
  return { sut, userRepositoryStub, hasherStub }
}

describe('DbUpdateUserUseCase', () => {
  test('Should call userRepository.update() with correct params', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const spyGetById = jest.spyOn(userRepositoryStub, 'update')
    await sut.update(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith(mockRequest)
  })
  test('Should throw if userRepository.update() throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'update').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should call hasher.hash() with correct params', async () => {
    const { sut, hasherStub } = makeSut()
    const spyhash = jest.spyOn(hasherStub, 'hash')
    await sut.update(mockRequest)
    expect(spyhash).toHaveBeenCalledWith(mockRequest.password)
  })
  test('Should throw if hasher.hash() throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.update(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = sut.update(mockRequest)
    expect(isValid).toBeTruthy()
  })
})
