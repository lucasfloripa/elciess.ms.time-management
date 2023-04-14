import { CreateUserRepositoryParams, UpdateUserRepositoryParams, UserRepository } from '../../../application/protocols'
import { User } from '../../../domain/entities'
import { PostgresHelper } from './postgres-helper'

export class UserPostgresRepository implements UserRepository {
  async create (params: CreateUserRepositoryParams): Promise<User> {
    const user = await PostgresHelper.query(
      'INSERT INTO users(id, password, email, name) VALUES($1, $2, $3, $4) RETURNING *', Object.values(params))
    return user.rows[0]
  }

  async update (params: UpdateUserRepositoryParams): Promise<User> {
    const user = await PostgresHelper.query(
      'UPDATE users SET password = $1, name = $2, email = $3 WHERE id = $4 RETURNING *', Object.values(params))
    return user.rows[0]
  }

  async checkByEmail (email: string): Promise<boolean> {
    const exists = await PostgresHelper.query(
      'SELECT id FROM users WHERE email = $1', [email])
    return exists.rowCount > 0
  }

  async getById (id: string): Promise<User> {
    const user = await PostgresHelper.query(
      'SELECT * FROM users WHERE id = $1', [id])
    return user.rows[0]
  }
}
