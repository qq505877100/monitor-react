import { combineReducers } from 'redux';
import { user } from './user.reducer';
import { yfReducer } from './yf/yf.reducer';
import {ywReducer} from './yw/yw.reducer';
import { index } from './index.reducer';
import axios from 'axios';
export default combineReducers(
  {
    user,
    index,
    yfReducer,
    ywReducer
  }
)
