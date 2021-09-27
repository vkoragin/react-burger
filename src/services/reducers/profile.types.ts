import { TUser } from '../../types'

export type UserStore = {
    user: TUser | null
    userRequest: boolean
    userFailed: boolean
}