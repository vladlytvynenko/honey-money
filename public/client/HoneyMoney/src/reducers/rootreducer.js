import {combineReducers} from 'redux';

import {auth} from './auth';
import {budget} from './budget';

export default combineReducers({
  auth,
  budget,
});
