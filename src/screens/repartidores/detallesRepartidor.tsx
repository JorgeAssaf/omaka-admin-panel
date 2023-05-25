import { useState } from "preact/compat";
import { DetallesRepartidorCard } from "../../components/cardDetalleRepartidor/detalles-repartidor-card";
import MapView from "../../components/map/MapView";
import { RepartidorType, RepartidorTypeForm } from "../../types/typeRepartidor";
import { PointType } from "../../types/typesMap";

type DetallesRutaProps = {
  repartidor: RepartidorType | RepartidorTypeForm | any;
}

export const DetallesRepartidor = ({ repartidor }: DetallesRutaProps) => {

  return (
    <div style={{ display: "flex", flexDirection: "column", width: '100%' }}>
      <DetallesRepartidorCard dataRepartidor={repartidor} />
    </div>
  );
};
