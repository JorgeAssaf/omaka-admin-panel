import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import PedidosReducer from './pedidosReducer';
import RepartidoresReducer from './repartidoresReducer';
import ClientsReducer from './clientsReducers';
const AppReducer = combineReducers({
  user: UserReducer,
  pedidos:PedidosReducer,
  repartidores:RepartidoresReducer,
  clientes: ClientsReducer,
});

export default AppReducer;

export type RootState = ReturnType<typeof AppReducer>;