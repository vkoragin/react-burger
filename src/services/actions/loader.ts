import {
    SHOW_LOADER
} from './actionTypes'

export function showLoader (loader: boolean) {
    return { type: SHOW_LOADER, loader: loader }
}