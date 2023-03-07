import { OrderType } from "../types/typeOrders";
import { RateType } from "../types/typeRate";
import Colors from "./colors";


export const getPointsRates = (rateList : RateType[], orderList : OrderType[]) => {
    const ordersRateId = rateList.reduce((acumulador : any, ruta) => {
        return acumulador.concat(ruta.Pedidos?ruta.Pedidos:[]);
      }, []);

    const orderRateObj = orderList.filter((item)=> ordersRateId?.includes(item.idPedido));
    const orderPoints = orderRateObj.map(item => {
        return({
            ubicacionPedido:item.ubicacionPedido,
            color:Colors().akostik200,
            name:item.nombreCliente,
            status:item.status,
        })
    });
    return(orderPoints);
}


