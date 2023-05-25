import { useState } from "preact/compat";
import { ClientType } from "../../types/typeOrders";
import { DetallesClienteCard } from "../../components/cardDetalleCliente/detalles-cliente-card";

type DetallesClienteProps = {
  cliente: ClientType;
}

export const DetallesCliente = ({ cliente }: DetallesClienteProps) => {

  return (
    <div style={{ display: "flex", flexDirection: "column", width: '100%' }}>
      <DetallesClienteCard editProfileAction={() => null} cliente={cliente} />
    </div>
  );
};
