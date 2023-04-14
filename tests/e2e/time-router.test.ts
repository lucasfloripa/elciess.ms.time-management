import request from 'supertest'
import { PostgresHelper } from '../../src/infra/db/postgres'
import app from '../../src/main/config/app'

describe('TimeRouter', () => {
  describe('GET /api/v1/times/:id', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .get('/api/v1/times/1')
        .expect(200)
    })
    test('Should return 204 if invalid id is provided', async () => {
      await PostgresHelper.connect()
      await request(app)
        .get('/api/v1/times/failid')
        .expect(204)
    })
  })
  describe('POST /api/v1/times', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/times')
        .send(
          {
            project_id: '2',
            user_id: '2',
            started_at: '2023-04-14T13:59:08.720Z',
            ended_at: '2023-04-14T1:59:08.720Z'
          }
        )
        .expect(200)
    })
    test('Should return 400 if is missing required values', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/times')
        .send({
          project_id: '2',
          user_id: '1'
        })
        .expect(400)
    })
    test('Should return 404 if invalid user id is provided', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/times')
        .send({
          project_id: '2',
          user_id: '1111'
        })
        .expect(400)
    })
    test('Should return 404 if invalid project id is provided', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/times')
        .send({
          project_id: '2222',
          user_id: '1'
        })
        .expect(400)
    })
  })
  describe('PUT /api/v1/times/:id', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .put('/api/v1/times/1')
        .send({
          project_id: '2',
          user_id: '1',
          started_at: '2023-04-14T13:59:08.720Z',
          ended_at: '2023-04-14T1:59:08.720Z'
        })
        .expect(200)
    })
    test('Should return 400 if is missing required values', async () => {
      await PostgresHelper.connect()
      await request(app)
        .put('/api/v1/times/1')
        .send({
          project_id: '2',
          user_id: '1'
        })
        .expect(400)
    })
    test('Should return 404 if invalid id is provided', async () => {
      await PostgresHelper.connect()
      await request(app)
        .put('/api/v1/times/failid')
        .send({
          project_id: '2',
          user_id: '1',
          started_at: '2023-04-14T13:59:08.720Z',
          ended_at: '2023-04-14T1:59:08.720Z'
        })
        .expect(404)
    })
  })
})
