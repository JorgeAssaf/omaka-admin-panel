import axios from "axios";
import { env } from "../env/envDev";
import { RepartidorTypeForm } from "../types/typeRepartidor";


export const GetRepartidores = async (idAdmin? : string)  =>{
    try{
      if (idAdmin) {
        let respuestaBack = await axios.post(env?.serverUrl+`/get-repartidores`,{idAdmin:idAdmin})        
          if(respuestaBack.data.status=='OK'){
            return(respuestaBack.data.repartidores);
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

  export const newRepartidor = async (repartidorData : RepartidorTypeForm,idAdmin: string)=>{
    try{
      if(repartidorData && idAdmin){
        let respuestaBack = await axios.post(env?.serverUrl+`/crear-usuario`,{userData:repartidorData,isAdmin:false,idAdmin:idAdmin})
        return(respuestaBack.data)
      }else{
          return({status:505})
      }
    }
    catch(err){
      console.log("error en newRepartidor",err);
        return({status:505})
    }
  }

