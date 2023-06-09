import axios from "axios";
import { env } from "../env/envDev";
import { OrderType } from "../types/typeOrders";

export const newOrder = async (datos : any, idUsuario?:string, isAdmin?:boolean,orderSaved?:boolean)=>{
    try{
      if (idUsuario) {
        let respuestaBack=await axios.post(`${env.serverUrl}/crear-pedido`,{datos,idUsuario,isAdmin,orderSaved})
        return respuestaBack.data;
      }else{
        return (false);
      } 
    }
    catch(err){
      console.error("error en NuevoPedido",err);
    }
}


export const GetOrders = async (idUsuario? : string, idRuta? : string)  =>{
  try{
    if (idUsuario) {
      let respuestaBack = await axios.post(env?.serverUrl+`/get-pedidos`,{idUsuario:idUsuario,isAdmin: true,idRuta:idRuta})       
        if(respuestaBack.data.status=='OK'){
          return({pedidosSinRuta:respuestaBack.data.pedidosSinRuta,pedidosConRuta:respuestaBack.data.pedidosConRuta});
        }
        else{
          return (false);
        }
    }else{
      return (false);
    }
  }catch(err){
    console.error(err);
    return (false);
  }
}


export const TranferPedidosToRuta = async (idUsuario : string | undefined,rutaToTransfer : any,arrayPedidosToTransfer : any)=>{
  try{
    if(idUsuario && rutaToTransfer && arrayPedidosToTransfer){
    let respuestaBack=await axios.post(`${env?.serverUrl}/transfer-pedido-ruta`,{idUsuario:idUsuario,rutaToTransfer:rutaToTransfer,arrayPedidosToTransfer:arrayPedidosToTransfer})
    return respuestaBack;
    }else{
      return({status:'300'})
    }
  }catch(err){
    console.log(err);
  }
}

export const preparateOrdersToTransfer = (ordersList? : Array<any>) => {
  let newArrayOrders = [] as any;
  if(ordersList){
    ordersList.map((item)=>{
      newArrayOrders.push(item.idPedido);
    })
  }

  return(newArrayOrders)
}

export const orderOrdersPerDistance = async(pedidos :OrderType[],ubicacionInicial:OrderType['ubicacionPedido'])=>{
  try{
    if (pedidos &&ubicacionInicial) {
      let respuestaBack = await axios.post(env?.serverUrl+`/ordenar-pedido-distancia`,{pedidos,ubicacionInicial})        
          return(respuestaBack.data.pedidosOrdenados);
    }else{
      return (false);
    }
  }catch(err){
    console.error(err);
    return (false);
  }
}


export const editOrder = async (datos : any, idPedido?:string, idUsuario?:string, isAdmin?:boolean)=>{
  try{
    if(datos){
      let respuestaBack=await axios.post(`${env.serverUrl}/editar-pedido`,{datos,idPedido,idUsuario,isAdmin})
      return (respuestaBack.data);
    }
  }
    catch(err){
      console.error("error en EditarPedido",err);
      return (false);
    }
}

export const deleteOrder = async (datos, idUsuario?:string, isAdmin?:boolean)=>{
  try{
    if (idUsuario) {
      let idPedido=datos.idPedido;
      let idRuta=datos.idRuta;
      let respuestaBack=await axios.post(`${env.serverUrl}/eliminar-pedido`,{datos,idPedido,idRuta,idUsuario,isAdmin})
      return respuestaBack.data;
    }else{
      return (false);
    } 
  }
  catch(err){
    console.error("error en eliminar Pedido",err);
  }
}