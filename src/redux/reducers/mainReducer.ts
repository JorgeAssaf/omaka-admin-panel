import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import PedidosReducer from './pedidosReducer';
const AppReducer = combineReducers({
  user: UserReducer,
  pedidos:PedidosReducer
});

export default AppReducer;

export type RootState = ReturnType<typeof AppReducer>;