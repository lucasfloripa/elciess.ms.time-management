import { PostgresHelper, UserPostgresRepository } from '../../../src/infra/db/postgres'

import { Client } from 'pg'
import { mockUser } from '../../domain/mocks'
import { CreateUserRepositoryParams, UpdateUserRepositoryParams } from '../../application/protocols'

jest.mock('pg', () => {
  const mockPgClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn()
  }
  return { Client: jest.fn(() => mockPgClient) }
})

const mockCreateUserRepositoryParams: CreateUserRepositoryParams = {
  id: '1',
  password: 'any_password',
  email: 'any_email',
  name: 'any_name'
}

const mockUpdateUserRepositoryParams: UpdateUserRepositoryParams = {
  id: '1',
  password: 'any_password',
  email: 'any_email',
  name: 'any_name'
}

describe('UserPostgresRepository', () => {
  let client
  const userPostgresRepository = new UserPostgresRepository()

  beforeAll(async () => {
    client = new Client()
    await PostgresHelper.connect()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  describe('checkByEmail()', () => {
    test('Should return true if successful', async () => {
      client.query.mockResolvedValueOnce({
        rows: [
          mockCreateUserRepositoryParams
        ],
        rowCount: 1
      })
      const exists = await userPostgresRepository.checkByEmail('any_email')
      expect(exists).toBeTruthy()
    })
    test('Should return false if fail', async () => {
      client.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })
      const exists = await userPostgresRepository.checkByEmail('any_email')
      expect(exists).toBeFalsy()
    })
  })
  describe('create()', () => {
    test('Should return an user created', async () => {
      client.query.mockResolvedValueOnce({
        rows: [
          mockCreateUserRepositoryParams
        ],
        rowCount: 1
      })
      const exists = await userPostgresRepository.create(mockCreateUserRepositoryParams)
      expect(exists).toEqual(mockCreateUserRepositoryParams)
    })
  })
  describe('getById()', () => {
    test('Should return an user on success', async () => {
      const result = mockUser
      client.query.mockResolvedValueOnce({
        rows: [
          result
        ],
        rowCount: 1
      })
      const user = await userPostgresRepository.getById('1')
      expect(user).toEqual(result)
    })
    test('Should return null if user not found', async () => {
      client.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })
      const exists = await userPostgresRepository.getById('1')
      expect(exists).toBeFalsy()
    })
  })
  describe('update()', () => {
    test('Should return an user updated', async () => {
      client.query.mockResolvedValueOnce({
        rows: [
          mockUpdateUserRepositoryParams
        ],
        rowCount: 1
      })
      const exists = await userPostgresRepository.update(mockUpdateUserRepositoryParams)
      expect(exists).toEqual(mockUpdateUserRepositoryParams)
    })
    test('Should return null if user to updated not found', async () => {
      client.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })
      const exists = await userPostgresRepository.update(mockUpdateUserRepositoryParams)
      expect(exists).toBeFalsy()
    })
  })
})
