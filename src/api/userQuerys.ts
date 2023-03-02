
import axios from 'axios';
import { env } from '../env/envDev';

export const getUser = async (uid? : string )  =>{
    try{
      if (uid) {
        let respuestaBack = await axios.post(env.serverUrl+`/get-profile`,{idUsuario:uid,isAdmin:true})
          if(respuestaBack.data.status=='OK'){
            return(respuestaBack.data.user);
          }
          else{
            return (false);
          }
      }
    }catch(err){
      console.log(err);
    }
}

export const registrarUsuario = async (userData : any)  =>{
  try{
    if (userData) {
      let respuestaBack = await axios.post(env.serverUrl+`/crear-usuario`,{userData:userData,isAdmin:true})
      return(respuestaBack.data);
    }
  }catch(err){
    console.log('error registrarUsuario',err);
  }
}