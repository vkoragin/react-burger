export type TLoginUserResponse = {
    success: boolean
    accessToken: string
    refreshToken: string
    user: {
        email:string
        name: string
    }
} & Response

export type TRegisterUserResponse = {
    success: boolean
    accessToken: string
    refreshToken: string
    user: {
        email:string
        name: string
    }
} & Response

export type TLogoutUserResponse = {
    ssuccess: boolean
    message: string
} & Response

export type TRefreshTokenResponse = {
    success: boolean
    accessToken: string
    refreshToken: string
} & Response