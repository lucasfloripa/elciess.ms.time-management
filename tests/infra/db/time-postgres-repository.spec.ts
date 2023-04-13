import { PostgresHelper, TimePostgresRepository } from '../../../src/infra/db/postgres'

import { Client } from 'pg'
import { mockTime } from '../../domain/mocks'
import { CreateTimeRepositoryParams, UpdateTimeRepositoryParams } from '../../application/protocols'

jest.mock('pg', () => {
  const mockPgClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn()
  }
  return { Client: jest.fn(() => mockPgClient) }
})

const mockCreateTimeRepositoryParams: CreateTimeRepositoryParams = {
  id: '1',
  project_id: '1',
  user_id: '1',
  started_at: '2023-04-13T14:00:00.704Z',
  ended_at: '2023-04-13T15:00:00.704Z'
}

const mockUpdateTimeRepositoryParams: UpdateTimeRepositoryParams = {
  id: '1',
  project_id: '1',
  user_id: '1',
  started_at: '2023-04-13T14:00:00.704Z',
  ended_at: '2023-04-13T15:00:00.704Z'
}

describe('TimePostgresRepository', () => {
  let client
  const timePostgresRepository = new TimePostgresRepository()

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

  describe('create()', () => {
    test('Should return an time created', async () => {
      client.query.mockResolvedValueOnce({
        rows: [
          mockCreateTimeRepositoryParams
        ],
        rowCount: 1
      })
      const exists = await timePostgresRepository.create(mockCreateTimeRepositoryParams)
      expect(exists).toEqual(mockCreateTimeRepositoryParams)
    })
  })
  describe('getById()', () => {
    test('Should return an time on success', async () => {
      const result = mockTime
      client.query.mockResolvedValueOnce({
        rows: [
          result
        ],
        rowCount: 1
      })
      const time = await timePostgresRepository.getById('1')
      expect(time).toEqual(result)
    })
    test('Should return null if time not found', async () => {
      client.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })
      const exists = await timePostgresRepository.getById('1')
      expect(exists).toBeFalsy()
    })
  })
  describe('update()', () => {
    test('Should return an time updated', async () => {
      client.query.mockResolvedValueOnce({
        rows: [
          mockUpdateTimeRepositoryParams
        ],
        rowCount: 1
      })
      const exists = await timePostgresRepository.update(mockUpdateTimeRepositoryParams)
      expect(exists).toEqual(mockUpdateTimeRepositoryParams)
    })
    test('Should return null if time to updated not found', async () => {
      client.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })
      const exists = await timePostgresRepository.update(mockUpdateTimeRepositoryParams)
      expect(exists).toBeFalsy()
    })
  })
  describe('getAll()', () => {
    test('Should return times on success', async () => {
      const result = mockTime
      client.query.mockResolvedValueOnce({
        rows: [
          result
        ],
        rowCount: 1
      })
      const project = await timePostgresRepository.getAllByProjectId('1')
      expect(project).toEqual([result])
    })
    test('Should return null if projects not found', async () => {
      client.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })
      const exists = await timePostgresRepository.getAllByProjectId('1')
      expect(exists?.length).toBe(0)
    })
  })
})
