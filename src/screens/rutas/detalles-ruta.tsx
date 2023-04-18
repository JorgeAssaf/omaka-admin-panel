import React, { useState } from "react";
import { DetallesRutaCard } from "../../components/cardDetalleRuta/detalles-ruta-card";
import { CardList } from "../../components/cardList/cards-list";
import { OrderType } from "../../types/typeOrders";
import { RateType, RateTypeFormSimple } from "../../types/typeRate";

type DetallesRutaProps = {
  rateData : RateType & RateTypeFormSimple;
  pedidosList?: OrderType[];
  addOrRemoveOrder?:(item: OrderType) => void
}

export const DetallesRuta = ({rateData,pedidosList, addOrRemoveOrder}:DetallesRutaProps) => {
  
  return(
    <div style={{ display: "flex", flexDirection: "column", width:'100%' }}>
      <DetallesRutaCard {...rateData} />
      {pedidosList &&  addOrRemoveOrder &&
        <div className='pedidos_detalles_container'>
          <CardList variant={'newRate negative'} onClickItem={(item)=>addOrRemoveOrder(item)} cardProps={{fullWidth:true}} tipo='pedidos' data={pedidosList} />
        </div>
      }
    </div>
  );
};
