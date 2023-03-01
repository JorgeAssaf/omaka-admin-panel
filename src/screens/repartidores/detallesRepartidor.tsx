import React, { useState } from "react";
import { DetallesRepartidorCard } from "../../components/cardDetalleRepartidor/detalles-repartidor-card";
import MapView from "../../components/map/MapView";
import { RepartidorType, RepartidorTypeForm } from "../../types/typeRepartidor";
import { PointType } from "../../types/typesMap";

type DetallesRutaProps = {
  repartidor :  RepartidorType | RepartidorTypeForm | any;
  pointList: PointType[]
}

export const DetallesRepartidor = ({repartidor,pointList}:DetallesRutaProps) => {

  const points = repartidor?repartidor.Ubicacion:pointList;
  
  return(
    <div style={{ display: "flex", flexDirection: "column", width:'100%' }}>
      <DetallesRepartidorCard goBack={()=>null} editProfileAction={()=>null} dataRepartidor={{DatosPersonales:{...repartidor}}} />
    </div>
  );
};
