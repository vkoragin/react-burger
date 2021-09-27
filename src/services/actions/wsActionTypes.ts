import { TMassage } from '../../types'

export const WS_CONNECTION_START = 'WS_CONNECTION_START'
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE'
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE'

export type StartAction = {
    type: typeof WS_CONNECTION_START 
}

export type SuccessAction = {
    type: typeof WS_CONNECTION_SUCCESS 
}

export type ErrorAction = {
    type: typeof WS_CONNECTION_ERROR
    payload: WebSocketEventMap
}

export type ClosedAction = {
    type: typeof WS_CONNECTION_CLOSED 
}

export type GetAction = {
    type: typeof WS_GET_MESSAGE
    payload: TMassage[]
}

export type SendAction = {
    type: typeof WS_SEND_MESSAGE 
}

export type Actions = 
    | StartAction 
    | SuccessAction
    | ErrorAction
    | ClosedAction
    | GetAction
    | SendAction
