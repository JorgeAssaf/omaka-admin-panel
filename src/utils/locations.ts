import { RepartidorType } from "../types/typeRepartidor";
import { avatarPalette } from "./colors";

export const converRepartidorToLocation = (repartidorList : RepartidorType[]) => {
   const ubicacionesConColor = [] as any;
    repartidorList.forEach((repartidor) => {
        if(repartidor?.DatosPersonales?.idUsuario && repartidor?.Ubicacion){
            const randomIndex = Math.floor(Math.abs(parseInt(repartidor?.DatosPersonales?.idUsuario, 36)) % avatarPalette.length);
            const color = avatarPalette[randomIndex];
            const title = `${repartidor?.DatosPersonales.nombre} ${repartidor?.DatosPersonales.apellido}`;
            ubicacionesConColor.push({color:color,title:title, ...repartidor.Ubicacion})
        }
    }) 
    return ubicacionesConColor;
}