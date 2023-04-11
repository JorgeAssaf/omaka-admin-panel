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


export const getOderForID = (orderListId? : string[],orderWithRate? : any) => {
    if(orderListId && orderWithRate){
        const newOrderList = orderWithRate.filter((item)=> orderListId?.includes(item.idPedido));
        return(newOrderList);
    }else{
        return([])
    }
}


export const getStatusOrder = (status : string) => {
    let localStatus = "Pendiente";
        switch (status) {
            case "pending":
                localStatus = "Pendiente"
                break;
            case "inProgress":
                localStatus = "En curso"
                break;
            case "finish":
                localStatus = "Entregado"
                break;
        }
    return localStatus;
}


export const getPointsOrder = (orderList : OrderType[]) => {
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
