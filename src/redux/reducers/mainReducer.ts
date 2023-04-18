import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import PedidosReducer from './pedidosReducer';
import RepartidoresReducer from './repartidoresReducer';
const AppReducer = combineReducers({
  user: UserReducer,
  pedidos:PedidosReducer,
  repartidores:RepartidoresReducer
});

export default AppReducer;

export type RootState = ReturnType<typeof AppReducer>;