import { GetOrders } from "../../api/ordersQuerys";

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
        console.error('Error en getListaPedidos');
    }

  };
  
  