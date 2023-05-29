import { OrderType } from "../types/typeOrders";
import { RateType } from "../types/typeRate";
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


export const getOrdersOfRepartidor = (allRates:RateType[],allOrders:OrderType[],idRepartidor?:string) => {
    
    const pedidosFinish = [] as OrderType[];
    const pedidosPending = [] as OrderType[];
    const pedidosReport = [] as OrderType[];
    
    for (const ruta of allRates) {
      if (ruta.repartidor.id === idRepartidor) {
        const pedidosRuta = ruta.Pedidos?ruta.Pedidos:[]
        for (const idPedido of pedidosRuta) {
          const pedido = allOrders.find(p => p.idPedido === idPedido);
          if (pedido) {
            if (pedido.status === "finish") {
              pedidosFinish.push(pedido);
            } else if (pedido.status === "pending") {
              pedidosPending.push(pedido);
            } else if (pedido.report) {
              pedidosReport.push(pedido);
            }
          }
        }
      }
    }
    return({
        pedidosFinish,
        pedidosPending,
        pedidosReport
    })
}


export function validarNumeroTelefono(telefono : string) {
    const regexTelefono = /^\+?52\d+$/;
    return regexTelefono.test(telefono);
  }
  


