import { userReducer } from './profile'
import { UserStore } from './profile.types'
import { TUser } from '../../types'
import {
    GET_USER,
    GET_USER_SUCCESS
} from '../actions/actionTypes'

const initialState: UserStore = {
    user: null,
    userRequest: false,
    userFailed: false
}

const user: TUser = {
    email: 'test@test.com',
    name: 'Иванов Иван Иванович'
}

describe('check orderNumberReducer', () => {
    it('check GET_USER', () => {
        const expected = {
            ...initialState,
            userRequest: true
        }
    
        const recived = userReducer(initialState, {
            type: GET_USER
        })
    
        expect(recived).toEqual(expected)
    })

    it('check GET_USER_SUCCESS', () => {    
        const expected = {
            ...initialState,
            user: user,
            userRequest: false
        }
    
        const recived = userReducer(initialState, {
            type: GET_USER_SUCCESS,
            user: user
        })
    
        expect(recived).toEqual(expected) 
    })
})
