import { useState, useEffect } from "preact/hooks";
import { CardList } from "../../components/cardList/cards-list";
import { OrderType } from "../../types/typeOrders";
import { RepartidorType } from "../../types/typeRepartidor";

type FormularioRepartidores = {
  onClickItem: (item: RepartidorType) => void
  repartidoresList: RepartidorType[];
  loading: boolean;
}


export const FormularioRepartidores = ({ onClickItem, repartidoresList, loading }: FormularioRepartidores) => {

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {loading ?
        <div>Cargando...</div>
        :
        <CardList tipo='repartidor' onClickItem={(item) => onClickItem(item)} cardProps={{ fullWidth: true }} data={repartidoresList} />
      }
    </div>
  );
};
