import request from 'supertest'
import { PostgresHelper } from '../../src/infra/db/postgres'
import app from '../../src/main/config/app'

describe('ProjectRouter', () => {
  describe('GET /api/v1/projects', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .get('/api/v1/projects')
        .expect(200)
    })
  })
  describe('GET /api/v1/projects/:id', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .get('/api/v1/projects/1')
        .expect(200)
    })
    test('Should return 404 if invalid id is provided', async () => {
      await PostgresHelper.connect()
      await request(app)
        .get('/api/v1/projects/failid')
        .expect(404)
    })
  })
  describe('POST /api/v1/projects', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/projects')
        .send({
          title: 'any-title',
          description: 'any-desc'
        })
        .expect(200)
    })
    test('Should return 400 if is missing required values', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/projects')
        .send({
          title: 'any-title'
        })
        .expect(400)
    })
  })
  describe('PUT /api/v1/projects/:id', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .put('/api/v1/projects/1')
        .send({
          title: 'any-title',
          description: 'any-desc'
        })
        .expect(200)
    })
    test('Should return 400 if any value is not provided', async () => {
      await PostgresHelper.connect()
      await request(app)
        .put('/api/v1/projects/1')
        .send({
          title: 'any-title'
        })
        .expect(400)
    })
    test('Should return 404 if invalid id is provided', async () => {
      await PostgresHelper.connect()
      await request(app)
        .put('/api/v1/projects/failid')
        .send({
          title: 'any-title',
          description: 'any-desc'
        })
        .expect(404)
    })
  })
})
