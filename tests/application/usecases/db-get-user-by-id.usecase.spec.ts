import { DbGetUserById } from '../../../src/application/usecases'
import { UserRepository } from '../../../src/application/protocols'
import { mockUserRepository } from '../../application/mocks'

const mockRequest = '1'

interface SutTypes {
  sut: DbGetUserById
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = mockUserRepository()
  const sut = new DbGetUserById(userRepositoryStub)
  return { sut, userRepositoryStub }
}

describe('DbGetUserById', () => {
  test('Should call userRepository.getById with correct params', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const spyGet = jest.spyOn(userRepositoryStub, 'getById')
    await sut.get(mockRequest)
    expect(spyGet).toHaveBeenCalledWith(mockRequest)
  })
  test('Should throw if userRepository throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const user = sut.get(mockRequest)
    await expect(user).rejects.toThrow()
  })
  test('Should return an user on success', async () => {
    const { sut } = makeSut()
    const user = sut.get(mockRequest)
    expect(user).toBeTruthy()
  })
})
