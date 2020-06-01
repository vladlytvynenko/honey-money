import {
  SIGN_UP_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOG_OUT_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  fetch: false,
  auth: false,
  user: {
    email: '',
    first_name: '',
    last_name: '',
    family: {
      uuid: '',
      name: '',
      creator: {},
      members: [],
    },
  },
};

export const auth = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOG_OUT_SUCCESS:
      return {
        ...initialState,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: {...payload},
        auth: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: {...payload},
        auth: true,
        fetch: true,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        user: {
          email: '',
          first_name: '',
          last_name: '',
          family: {
            uuid: '',
            name: '',
            creator: {},
            members: [],
          },
        },
        auth: false,
        fetch: true,
      };
    default:
      return state;
  }
};
