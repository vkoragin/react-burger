import {
    SHOW_LOADER
} from './actionTypes'

export function showLoader (loader) {
    return { type: SHOW_LOADER, loader: loader }
}