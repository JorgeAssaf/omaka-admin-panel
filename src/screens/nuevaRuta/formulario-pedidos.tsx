import { useState, useEffect } from "preact/hooks";
import { CardList } from "../../components/cardList/cards-list";
import { OrderType } from "../../types/typeOrders";

type FormularioPedidos = {
  onClickItem: (item: OrderType) => void
  pedidosList: OrderType[];
  loading: boolean;
}


export const FormularioPedidos = ({ onClickItem, pedidosList, loading }: FormularioPedidos) => {

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {loading ?
        <div>Cargando...</div>
        :
        <CardList variant={'newRate positive'} onClickItem={(item) => onClickItem(item)} cardProps={{ fullWidth: true }} tipo='pedidos' data={pedidosList} />
      }
    </div>
  );
};
