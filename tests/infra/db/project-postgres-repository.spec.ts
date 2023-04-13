import { PostgresHelper, ProjectPostgresRepository } from '../../../src/infra/db/postgres'

import { Client } from 'pg'
import { mockProject } from '../../domain/mocks'
import { CreateProjectRepositoryParams, UpdateProjectRepositoryParams } from '../../application/protocols'

jest.mock('pg', () => {
  const mockPgClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn()
  }
  return { Client: jest.fn(() => mockPgClient) }
})

const mockCreateProjectRepositoryParams: CreateProjectRepositoryParams = {
  id: '1',
  description: 'any-description',
  title: 'any-title'
}

const mockUpdateProjectRepositoryParams: UpdateProjectRepositoryParams = {
  id: '1',
  description: 'any-description',
  title: 'any-title'
}

describe('ProjectPostgresRepository', () => {
  let client
  const projectPostgresRepository = new ProjectPostgresRepository()

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
    test('Should return an project created', async () => {
      client.query.mockResolvedValueOnce({
        rows: [
          mockCreateProjectRepositoryParams
        ],
        rowCount: 1
      })
      const exists = await projectPostgresRepository.create(mockCreateProjectRepositoryParams)
      expect(exists).toEqual(mockCreateProjectRepositoryParams)
    })
  })
  describe('getById()', () => {
    test('Should return an project on success', async () => {
      const result = mockProject
      client.query.mockResolvedValueOnce({
        rows: [
          result
        ],
        rowCount: 1
      })
      const project = await projectPostgresRepository.getById('1')
      expect(project).toEqual(result)
    })
    test('Should return null if project not found', async () => {
      client.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })
      const exists = await projectPostgresRepository.getById('1')
      expect(exists).toBeFalsy()
    })
  })
  describe('update()', () => {
    test('Should return an project updated', async () => {
      client.query.mockResolvedValueOnce({
        rows: [
          mockUpdateProjectRepositoryParams
        ],
        rowCount: 1
      })
      const exists = await projectPostgresRepository.update(mockUpdateProjectRepositoryParams)
      expect(exists).toEqual(mockUpdateProjectRepositoryParams)
    })
    test('Should return null if project to updated not found', async () => {
      client.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })
      const exists = await projectPostgresRepository.update(mockUpdateProjectRepositoryParams)
      expect(exists).toBeFalsy()
    })
  })
  describe('getAll()', () => {
    test('Should return projects on success', async () => {
      const result = mockProject
      client.query.mockResolvedValueOnce({
        rows: [
          result
        ],
        rowCount: 1
      })
      const project = await projectPostgresRepository.getAll()
      expect(project).toEqual([result])
    })
    test('Should return null if projects not found', async () => {
      client.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })
      const exists = await projectPostgresRepository.getAll()
      expect(exists?.length).toBe(0)
    })
  })
})
