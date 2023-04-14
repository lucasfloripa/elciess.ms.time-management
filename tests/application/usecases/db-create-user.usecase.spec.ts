import { DbCreateUserUseCase } from '../../../src/application/usecases'
import { UserRepository, Hasher, IdGenerator } from '../../../src/application/protocols'
import { CreateUserParams } from '../../../src/domain/contracts'
import { mockUserRepository, mockIdGenerator, mockHasher } from '../../application/mocks'
import { mockFakeLogger } from '../../domain/mocks'

const mockRequest: CreateUserParams = {
  name: 'any-name',
  password: 'any-password',
  email: 'any-email'
}

interface SutTypes {
  sut: DbCreateUserUseCase
  userRepositoryStub: UserRepository
  idGeneratorStub: IdGenerator
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserRepository()
  const idGeneratorStub = mockIdGenerator()
  const hasherStub = mockHasher()
  const fakeLogger = mockFakeLogger()
  const sut = new DbCreateUserUseCase(userRepositoryStub, idGeneratorStub, hasherStub, fakeLogger)
  return { sut, userRepositoryStub, idGeneratorStub, hasherStub }
}

describe('DbCreateUserUseCase', () => {
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
  test('Should call hasher with correct params', async () => {
    const { sut, hasherStub } = makeSut()
    const spyHash = jest.spyOn(hasherStub, 'hash')
    await sut.create(mockRequest)
    expect(spyHash).toHaveBeenCalledWith(mockRequest.password)
  })
  test('Should throw if hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.create(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should call userRepository.checkByEmail() with correct params', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const spyCheckByEmail = jest.spyOn(userRepositoryStub, 'checkByEmail')
    await sut.create(mockRequest)
    expect(spyCheckByEmail).toHaveBeenCalledWith('any-email')
  })
  test('Should call userRepository.create() with correct params', async () => {
    const { sut, idGeneratorStub, hasherStub, userRepositoryStub } = makeSut()
    const spyCreate = jest.spyOn(userRepositoryStub, 'create')
    const spyGenerate = jest.spyOn(idGeneratorStub, 'generate')
    const spyHash = jest.spyOn(hasherStub, 'hash')
    await sut.create(mockRequest)
    expect(spyCreate).toHaveBeenCalledWith({
      id: await spyGenerate.mock.results[0].value,
      email: mockRequest.email,
      password: await spyHash.mock.results[0].value,
      name: mockRequest.name
    })
  })
  test('Should throw if userRepository throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'create').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.create(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = sut.create(mockRequest)
    expect(isValid).toBeTruthy()
  })
})
