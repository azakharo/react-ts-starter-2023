import {combineReducers} from 'redux';

import {reducer as appInit} from './slices/appInit';
import {reducer as auth} from './slices/auth';

export default combineReducers({
  appInit,
  auth,
});
