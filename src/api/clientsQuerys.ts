import axios from "axios";
import { env } from "../env/envDev";

export const getClientByUser = async (idUsuario? : string)  =>{
  try{
    if (idUsuario) {
      let respuestaBack = await axios.post(env?.serverUrl+`/get-client-by-user`,{idUsuario:idUsuario})        
        if(respuestaBack.data.status=='OK'){
          return(respuestaBack.data.arrayBusqueda);
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