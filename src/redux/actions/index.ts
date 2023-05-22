import { getClientByUser } from "../../api/clientsQuerys";
import { GetOrders } from "../../api/ordersQuerys";
import { tomarRutas } from "../../api/rateQuerys";
import { GetRepartidores } from "../../api/repartidorQuery";

//Pedidos
export const getListaPedidos = (idUsuario?: string) => async (dispatch : any) => {  
    try {
        const resOrder = await GetOrders(idUsuario);
        if (resOrder) {
            dispatch({type: 'setOrderList', payload: resOrder && resOrder.pedidosSinRuta});
            dispatch({type: 'setOrderListWithRate', payload: resOrder && resOrder.pedidosConRuta});
        } 
    } catch (error) {
        console.log('Error en getListaPedidos',error);
    }

  };
  
  


  //Repartidores
export const setListaRepartidores = (idUsuario?: string) => async (dispatch : any) => {  
    try {
        const resBack = await GetRepartidores(idUsuario);
        if (resBack) {
            dispatch({type: 'setRepartidorList', payload:resBack});
        }
    } catch (error) {
        console.log('Error en setListaRepartidores',error);
    }
  };

  //Rutas
  export const setListaRutas = (idUsuario?: string) => async (dispatch : any) => {  
    try {
        const reqBack = await tomarRutas(idUsuario, true);
        if (reqBack.status == "OK") {
            dispatch({type: 'setActiveRates', payload:reqBack.activeRates});
            dispatch({type: 'setHistoryRates', payload:reqBack.historyRates});
        }
    } catch (error) {
        console.log('Error en setListaRepartidores',error);
    }
  };



    //Clientes
export const getListClients = (idUsuario?: string) => async (dispatch : any) => {  
    try {
        const resBack = await getClientByUser(idUsuario);
        if (resBack) {
            dispatch({type: 'setClientsList', payload:resBack});
        }
    } catch (error) {
        console.log('Error en getListClients',error);
    }

  };


  
  