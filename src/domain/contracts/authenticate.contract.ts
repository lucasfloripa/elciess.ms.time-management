import { User } from '../entities'

export interface Authenticate {
  auth: (credentials: AuthenticateParams) => Promise<AuthenticateResult>
}

export interface AuthenticateParams {
  email: string
  password: string
}

export interface AuthenticateResult {
  user: User
  token: string
}
