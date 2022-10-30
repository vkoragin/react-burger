import { TOrder } from '../../types';
import { OrderStore } from './order.types';
import {
  GET_ORDER,
  GET_ORDER_SUCCESS,
  CLEAR_ORDER,
} from '../actions/actionTypes';

import orderReducer from './order';

const orders: TOrder[] = [
  {
    createdAt: new Date('2021-09-19T13:35:57.822Z'),
    ingredients: [
      '60d3b41abdacab0026a733cd',
      '60d3b41abdacab0026a733c9',
      '60d3b41abdacab0026a733c7',
    ],
    name: 'Бессмертный space флюоресцентный бургер',
    number: 3559,
    owner: {
      createdAt: new Date('2021-09-19T13:35:57.822Z'),
      updatedAt: new Date('2021-09-19T13:35:57.954Z'),
      email: 'test@test.com',
      name: 'Иванов Иван Иванович',
    },
    price: 665,
    status: 'done',
    updatedAt: new Date('2021-09-19T13:35:57.954Z'),
    __v: 0,
    _id: '61473cbddab0f3001bb06df8',
  },
];

const initialOrderState: OrderStore = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

describe('check orderReducer', () => {
  it('check GET_ORDER', () => {
    const expected = {
      ...initialOrderState,
      orderRequest: true,
    };

    const recived = orderReducer(initialOrderState, {
      type: GET_ORDER,
    });

    expect(recived).toEqual(expected);
  });

  it('check GET_ORDER_SUCCESS', () => {
    const expected = {
      ...initialOrderState,
      order: orders[0],
      orderRequest: false,
    };

    const recived = orderReducer(initialOrderState, {
      type: GET_ORDER_SUCCESS,
      order: orders[0],
    });

    expect(recived).toEqual(expected);
  });

  it('check CLEAR_ORDER', () => {
    const expected = {
      ...initialOrderState,
    };

    const recived = orderReducer(initialOrderState, {
      type: CLEAR_ORDER,
      order: null,
    });

    expect(recived).toEqual(expected);
  });
});
