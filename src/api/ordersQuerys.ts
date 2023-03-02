import axios from "axios";
import { env } from "../env/envDev";

export const newOrder = async (datos : any, idUsuario?:string, isClient?:boolean)=>{
    try{
      if (idUsuario) {
        let respuestaBack=await axios.post(`${env.serverUrl}/crear-pedido`,{datos:datos,idUsuario:idUsuario,isClient:isClient})
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
      let respuestaBack = await axios.post(env?.serverUrl+`/get-pedidos`,{idUsuario:idUsuario,idRuta:idRuta})        
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