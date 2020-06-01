import AsyncStorage from '@react-native-community/async-storage';
import {
  SIGN_UP_FAILURE,
  LOG_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
} from './actionTypes';
import {api} from '../config';
import HeaderRequests from '../common/HeaderRequests';

export const logout = () => dispatch => {
  const logOut = async () => {
    try {
      HeaderRequests();
      await AsyncStorage.removeItem('@token');
      return dispatch({
        type: LOG_OUT_SUCCESS,
      });
    } catch (e) {
      console.log(e);
    }
  };
  logOut();
};

export const sign_in_func = data => dispatch => {
  const getData = async () => {
    try {
      HeaderRequests();
      try {
        api.sign_in(data).then(res => {
          if (res.status > 199 && res.status < 300) {
            const {token} = res.data;
            const storeData = async () => {
              try {
                await AsyncStorage.setItem('@token', token);
                HeaderRequests(token);
                return dispatch({
                  type: SIGN_IN_SUCCESS,
                });
              } catch (e) {
                return dispatch({
                  type: SIGN_IN_FAILURE,
                });
              }
            };
            storeData();
          } else {
            return dispatch({
              type: SIGN_IN_FAILURE,
            });
          }
        });
      } catch (e) {
        return dispatch({
          type: LOG_OUT_SUCCESS,
        });
      }
    } catch (e) {
      return dispatch({
        type: LOG_OUT_SUCCESS,
      });
    }
  };
  getData();
};

export const sign_up_funk = (data, navigation) => dispatch => {
  try {
    HeaderRequests();
    api
      .sign_up(data)
      .then(res => {
        if (res.status > 199 && res.status < 300) {
          const {token} = res.data;
          const storeData = async () => {
            try {
              await AsyncStorage.setItem('@token', token);
              HeaderRequests(token);
              return dispatch({
                type: SIGN_UP_SUCCESS,
                payload: data,
              });
            } catch (e) {
              return dispatch({
                type: SIGN_UP_FAILURE,
              });
            }
          };
          storeData();
        } else {
          return dispatch({
            type: SIGN_UP_FAILURE,
          });
        }
      })
      .catch(err => {
        return dispatch({
          type: SIGN_UP_FAILURE,
        });
      });
  } catch (e) {
    return dispatch({
      type: SIGN_UP_FAILURE,
    });
  }
};

export const byToken = () => dispatch => {
  const getData = async () => {
    try {
      HeaderRequests();
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        HeaderRequests(value);
        try {
          api
            .byToken()
            .then(res => {
              if (res.status > 199 && res.status < 300) {
                return dispatch({
                  type: SIGN_IN_SUCCESS,
                  payload: res.data,
                });
              } else {
                return dispatch({
                  type: SIGN_IN_FAILURE,
                });
              }
            })
            .catch(console.log);
        } catch (e) {
          return dispatch({
            type: LOG_OUT_SUCCESS,
          });
        }
      }
    } catch (e) {
      return dispatch({
        type: LOG_OUT_SUCCESS,
      });
    }
  };
  getData();
};
