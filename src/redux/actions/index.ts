import { GetOrders } from "../../api/ordersQuerys";
import { GetRepartidores } from "../../api/repartidorQuery";

//Pedidos
export const getListaPedidos = (idUsuario: string) => async (dispatch : any) => {  
    try {
        const resOrder = await GetOrders(idUsuario);
        if (resOrder) {
            dispatch({type: 'setOrderList', payload: resOrder && resOrder.pedidosSinRuta});
            dispatch({type: 'setOrderListWithRate', payload: resOrder && resOrder.pedidosConRuta});
        } else {
            console.error('Error en getListaPedidos');
          }
    } catch (error) {
        console.log('Error en getListaPedidos',error);
    }

  };
  
  


  //Repartidores
export const getListaRepartidores = (idUsuario: string) => async (dispatch : any) => {  
    try {
        const resBack = await GetRepartidores(idUsuario);
        if (resBack) {
            dispatch({type: 'setRepartidorList', payload:resBack});
        } else {
            console.error('Error en getListaRepartidores');
          }
    } catch (error) {
        console.log('Error en getListaRepartidores',error);
    }

  };

  