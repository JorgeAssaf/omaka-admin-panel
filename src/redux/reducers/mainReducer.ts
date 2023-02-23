import { combineReducers } from 'redux';
import UserReducer from './userReducer';
const AppReducer = combineReducers({
  user: UserReducer,
});

export default AppReducer;

export type RootState = ReturnType<typeof AppReducer>;