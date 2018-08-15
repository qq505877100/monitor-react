import { combineReducers } from 'redux';
import { yfReducer } from './yf/yf.reducer';
import {ywReducer} from './yw/yw.reducer';
import { index } from './index.reducer';
export default combineReducers(
  {
    index,
    yfReducer,
    ywReducer
  }
)
