import { loaderReducer } from './loader'
import {
    SHOW_LOADER
} from '../actions/actionTypes'

const initialState = {
    loader: false
}

describe('check loaderReducer', () => {
    it('check initial state', () => {
        expect(loaderReducer(undefined, {})).toEqual(initialState)
    })

    it('check SHOW_LOADER', () => {
        const expected = {
            ...initialState,
            loader: true
        }
    
        const recived = loaderReducer(initialState, {
            type: SHOW_LOADER, 
            loader: true
        })
    
        expect(recived).toEqual(expected)
    })
})