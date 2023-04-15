import { User } from '../entities'

export interface AuthMiddleware {
  auth: (token: string,) => Promise<AuthMiddlewareResult>
}

export interface AuthMiddlewareParams {
  accessToken: string
}

export type AuthMiddlewareResult = User | null
