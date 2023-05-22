import { OrderType } from "../types/typeOrders";
import { RateType } from "../types/typeRate";
import Colors from "./colors";
import { convertDateFormFirebase } from "./dateAndTime";

export const getPointsRates = (
  rateList: RateType[],
  orderList: OrderType[]
) => {
  const ordersRateId = rateList.reduce((acumulador: any, ruta) => {
    return acumulador.concat(ruta.Pedidos ? ruta.Pedidos : []);
  }, []);

  const orderRateObj = orderList.filter((item) =>
    ordersRateId?.includes(item.idPedido)
  );
  const orderPoints = orderRateObj.map((item) => {
    return {
      ubicacionPedido: item.ubicacionPedido,
      color: Colors().akostik200,
      name: item.nombreCliente,
      status: item.status
    };
  });
  return orderPoints;
};

export const getTimeAndDistanceOfRate = (
  rutas: RateType[],
  pedidos: OrderType[]
) => {
  const pedidosOrdenados = pedidos
    .filter((pedido) => pedido.fechaEntrega)
    .sort((a, b) => {
      const fechaEntregaA = convertDateFormFirebase(a.fechaEntrega);
      const fechaEntregaB = convertDateFormFirebase(b.fechaEntrega);
      return fechaEntregaA.getTime() - fechaEntregaB.getTime();
    });

  let tiempoTotalGlobal = 0;
  let distanciaTotalGlobal = 0;

  for (const ruta of rutas) {
    if(ruta.fechaInicio){
        const pedidosIdRuta = pedidosOrdenados.filter(
            (pedido) => pedido.ruta?.idRuta === ruta.idRuta
          );
      
          let tiempoTotal = 0;
          let distanciaTotal = 0;
      
          pedidosIdRuta.forEach((pedido, index) => {
            const fechaCreacion = convertDateFormFirebase(ruta.fechaInicio);
            const fechaEntrega = convertDateFormFirebase(pedido.fechaEntrega);
            const tiempoPedido = fechaEntrega.getTime() - fechaCreacion.getTime();
            tiempoTotal += tiempoPedido;
      
            if (index > 0) {
              const pedidoAnterior = pedidosIdRuta[index - 1];
              const distanciaPedido = calcularDistancia(
                pedidoAnterior.ubicacionPedido.lat,
                pedidoAnterior.ubicacionPedido.lng,
                pedido.ubicacionPedido.lat,
                pedido.ubicacionPedido.lng
              );
              distanciaTotal += distanciaPedido;
            }
          });
      
          tiempoTotalGlobal += tiempoTotal;
          distanciaTotalGlobal += distanciaTotal;
    }
  }

  const resultados = {
    tiempoTotalGlobal,
    distanciaTotalGlobal
  };
console.log(resultados);

  return(resultados)
};


function calcularDistancia(lat1, lon1, lat2, lon2) {
    const radioTierra = 6371; // Radio de la Tierra en kilómetros
  
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distanciaEnKilometros = radioTierra * c;
    return distanciaEnKilometros;
  }
