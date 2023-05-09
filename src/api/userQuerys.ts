
import axios from 'axios';
import { env } from '../env/envDev';
import { getAuth } from 'firebase/auth';
const auth = getAuth();

export const getUser = async (uid? : string )  =>{
    try{
      if (uid) {
        const idToken = await auth.currentUser?.getIdToken();
        let respuestaBack = await axios.post(env.serverUrl+`/get-profile`,{idUsuario:uid,isAdmin:true},{
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
      console.log(respuestaBack.data);

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

export const getOnBoardingData =async (uid?:string,type?:string) => {
  try{
    if(uid){
      let respuestaBack = await axios.post(env.serverUrl+`/getOnBoardingData`,{idUsuario:uid,type:type})
      if(respuestaBack.data.status=='OK'){
        return(respuestaBack.data);
      }
    }

  }catch(err){

    console.log('error getOnBoardingData',err);
  }

}

export const setFreeTrial = async (idUsuario : string | undefined)=>{
  try{
    if(idUsuario){
      let respuestaBack=await axios.post(`${env?.serverUrl}/set-free-trial`,{idUsuario,isAdmin:true})
      return respuestaBack.data;
    }
  }
  catch(err){
    console.log(err);
    return {status:'500',error:err};

  }
}