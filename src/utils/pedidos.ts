import { RootState } from "../redux/reducers/mainReducer";
import Store from "../redux/store";
import { OrderType } from "../types/typeOrders";
import Colors from "./colors";



export const getIdPedidos = (pedidosList : OrderType[]) => { 
    const idPedidos = [] as Array<string>;
    pedidosList.forEach((item)=>{
        idPedidos.push(item.idPedido)
    })
    return idPedidos;
}


export const getOderForID = (orderListId? : string[],selector?:any) => {
    const orderWithRate = selector(
        (state: RootState) => state.pedidos.orderListWithRate
      )
    if(orderListId){
        const newOrderList = orderWithRate.filter((item)=> orderListId?.includes(item.idPedido));
        return(newOrderList);
    }else{
        return([])
    }

}

export const getPointsORder = (orderList : OrderType[]) => {
    const orderPoints = orderList.map(item => {
        return({
            ubicacionPedido:item.ubicacionPedido,
            color:Colors().chalchihuitl400,
            name:item.nombreCliente,
            status:item.status,
        })
    });
    return(orderPoints);
}
