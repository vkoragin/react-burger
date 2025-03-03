import { UserStore } from './profile.types';
import { Actions } from '../actions/profile.types';
import { GET_USER, GET_USER_FAILED, GET_USER_SUCCESS } from '../actions/actionTypes';

const initialUSerState: UserStore = {
  user: null,
  userRequest: false,
  userFailed: false,
};

const userReducer = (state = initialUSerState, action: Actions) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        userRequest: true,
        userFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        userRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
