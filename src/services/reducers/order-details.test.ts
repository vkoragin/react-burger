import { OrderNumberStore } from './order-details.type';
import { GET_ODDER_NUMBER, GET_ODDER_NUMBER_SUCCESS } from '../actions/actionTypes';

import orderNumberReducer from './order-details';

const initialState: OrderNumberStore = {
  number: '',
  numberRequest: false,
  numberFailed: false,
};

const number = 3557;

describe('check orderNumberReducer', () => {
  it('check GET_INGREDIENTS', () => {
    const expected = {
      ...initialState,
      numberRequest: true,
    };

    const recived = orderNumberReducer(initialState, {
      type: GET_ODDER_NUMBER,
    });

    expect(recived).toEqual(expected);
  });

  it('check GET_ODDER_NUMBER_SUCCESS', () => {
    const expected = {
      ...initialState,
      number,
      numberRequest: false,
    };

    const recived = orderNumberReducer(initialState, {
      type: GET_ODDER_NUMBER_SUCCESS,
      number,
    });

    expect(recived).toEqual(expected);
  });
});
