import request from 'supertest'
import { PostgresHelper } from '../../src/infra/db/postgres'
import app from '../../src/main/config/app'

describe('UserRouter', () => {
  describe('GET /api/v1/users/:id', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .get('/api/v1/users/1')
        .expect(200)
    })
    test('Should return 404 if invalid id is provided', async () => {
      await PostgresHelper.connect()
      await request(app)
        .get('/api/v1/users/failid')
        .expect(404)
    })
  })
  describe('POST /api/v1/users', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/users')
        .send({
          name: 'any-name',
          password: 'any-password',
          email: `${Math.random()}@mail.com`
        })
        .expect(200)
    })
    test('Should return 400 if is missing required values', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/users')
        .send({
          name: 'any-title'
        })
        .expect(400)
    })
  })
  describe('POST /api/v1/authenticate', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/authenticate')
        .send({
          password: '123',
          email: '123@mail.com'
        })
        .expect(200)
    })
    test('Should return 401 if auth fails', async () => {
      await PostgresHelper.connect()
      await request(app)
        .post('/api/v1/authenticate')
        .send({
          password: '1234',
          email: '123@mail.com'
        })
        .expect(401)
    })
  })
  describe('PUT /api/v1/users/:id', () => {
    test('Should return 200 on success', async () => {
      await PostgresHelper.connect()
      await request(app)
        .put('/api/v1/users/1')
        .send({
          name: 'any-name',
          password: 'any-password',
          email: 'email@mail.com'
        })
        .expect(200)
    })
    test('Should return 400 if is missing required values', async () => {
      await PostgresHelper.connect()
      await request(app)
        .put('/api/v1/users/1')
        .send({
          title: 'any-title'
        })
        .expect(400)
    })
    test('Should return 404 if invalid id is provided', async () => {
      await PostgresHelper.connect()
      await request(app)
        .put('/api/v1/users/failid')
        .send({
          name: 'any-name',
          password: 'any-password',
          email: 'email@mail.com'
        })
        .expect(404)
    })
  })
})
