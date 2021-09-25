import { TOrder } from '../../types'

export type OrderStore = {
    order: TOrder | null
    orderRequest: boolean
    orderFailed: boolean
}