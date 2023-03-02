import { OrderType } from "../types/typeOrders";

export const getIdPedidos = (pedidosList : OrderType[]) => { 
    const idPedidos = [] as Array<string>;
    pedidosList.forEach((item)=>{
        idPedidos.push(item.idPedido)
    })
    return idPedidos;
}