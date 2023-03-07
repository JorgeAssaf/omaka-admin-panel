import axios from "axios";
import { env } from "../env/envDev";
import { RateType, RateTypeFormSimple } from "../types/typeRate";
import { TranferPedidosToRuta, preparateOrdersToTransfer } from "./ordersQuerys";

export const newRate = async (rutaData : RateTypeFormSimple,creador:RateType['creador'],repartidor:RateType['repartidor'] | undefined)=>{
    try{
      if(rutaData && creador.id){
        let respuestaBack=await axios.post(`${env.serverUrl}/crear-ruta`,{rutaData:rutaData,creador:creador,repartidor:repartidor})
        let reqBackTransfer = await TranferPedidosToRuta(creador.id,{...rutaData,idRuta:respuestaBack.data.idRuta},rutaData.Pedidos) as any;
        return reqBackTransfer.data;
      }else{
          return({status:505})
      }
    }
    catch(err){
      console.log("error en CrearNuevaRuta",err);
        return({status:505})
    }
  }

    
  export const tomarRutas = async (idUsuario? : string, isAdmin?: boolean )=>{
    try{
      if(idUsuario){
        let respuestaBack=await axios.post(`${env?.serverUrl}/tomar-rutas`,{idUsuario:idUsuario, isAdmin:isAdmin})
        return respuestaBack.data;
      }else{
          return({status:505})
      }
    }
    catch(err){
        console.log("error en tomarRutas",err);
        return({status:505})
    }
  }

