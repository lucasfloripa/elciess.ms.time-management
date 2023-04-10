import { IUser } from '../../entities'

export interface GetUserById {
  handle: (userId: string) => Promise<IUser>
}
