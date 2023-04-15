import { DbAuthentication } from '../../../src/application/usecases'
import { UserRepository, Hasher, Encrypter } from '../../../src/application/protocols'
import { AuthenticateParams } from '../../../src/domain/contracts'
import { mockUserRepository, mockEncrypterStub, mockHasher } from '../../application/mocks'
import { mockFakeLogger } from '../../domain/mocks'

const mockRequest: AuthenticateParams = {
  password: 'any-password',
  email: 'any-email'
}

interface SutTypes {
  sut: DbAuthentication
  userRepositoryStub: UserRepository
  hasherStub: Hasher
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserRepository()
  const encrypterStub = mockEncrypterStub()
  const hasherStub = mockHasher()
  const fakeLogger = mockFakeLogger()
  const sut = new DbAuthentication(userRepositoryStub, hasherStub, encrypterStub, fakeLogger)
  return { sut, userRepositoryStub, encrypterStub, hasherStub }
}

describe('DbAuthentication', () => {
  test('Should throw if hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'compare').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.auth(mockRequest)
    await expect(isValid).rejects.toThrow()
  })
  test('Should call encrypter with correct params', async () => {
    const { sut, encrypterStub } = makeSut()
    const spyEncrypt = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockRequest)
    expect(spyEncrypt).toHaveBeenCalledWith(mockRequest.email)
  })
  test('Should throw if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.auth(mockRequest)
    await expect(isValid).rejects.toThrow()
  })

  test('Should call userRepository.loadByEmail() with correct params', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const spyCheckByEmail = jest.spyOn(userRepositoryStub, 'loadByEmail')
    await sut.auth(mockRequest)
    expect(spyCheckByEmail).toHaveBeenCalledWith('any-email')
  })
  test('Should throw if userRepository.loadByEmail() throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const isValid = sut.auth(mockRequest)
    await expect(isValid).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = sut.auth(mockRequest)
    expect(isValid).toBeTruthy()
  })
})
