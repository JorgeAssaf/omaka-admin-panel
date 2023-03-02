import axios from "axios";
import { env } from "../env/envDev";
import { RateType, RateTypeForm } from "../types/typeRate";

export const newRate = async (rutaData : RateTypeForm,creador:RateType['creador'],repartidor:RateType['repartidor'])=>{
    try{
      if(rutaData){
        let respuestaBack=await axios.post(`${env.serverUrl}/crear-ruta`,{rutaData:rutaData,creador:creador,repartidor:repartidor})
        return respuestaBack.data;
      }else{
          return({status:505})
      }
    }
    catch(err){
      console.log("error en CrearNuevaRuta",err);
        return({status:505})
    }
  }