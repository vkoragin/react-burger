import { LoaderStore } from './loader.types';
import { SHOW_LOADER } from '../actions/actionTypes';

import loaderReducer from './loader';

const initialState: LoaderStore = {
  loader: false,
};

describe('check loaderReducer', () => {
  it('check SHOW_LOADER', () => {
    const expected = {
      ...initialState,
      loader: true,
    };

    const recived = loaderReducer(initialState, {
      type: SHOW_LOADER,
      loader: true,
    });

    expect(recived).toEqual(expected);
  });
});
