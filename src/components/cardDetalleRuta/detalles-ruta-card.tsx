import { SvgIcon } from "@mui/material";
import { useState } from "react";
import styled, { css } from "styled-components";
import { Person, Receipt, CalendarToday } from "@mui/icons-material";
import { RateTypeFormSimple } from "../../types/typeRate";
import { IconText } from "../atoms/iconText";
import "./styles.css";

export const DetallesRutaCard = (props: RateTypeFormSimple) => {
  const { nombreRuta, fechaEntrega, Pedidos, repartidor } = props;

  const [isSelect, setIsSelect] = useState(true);
  const clickPrueba = () => {
    setIsSelect(!isSelect);
  };

  return (
    <div className="card-detalle-ruta-container">
      <div>
        <div className="titulo-card">{nombreRuta}</div>
        {Pedidos && (
          <IconText
            icon={Receipt}
            iconSize="small"
            text={`${Pedidos?.length} Pedido(s)`}
          />
        )}

        {!!fechaEntrega && (
          <IconText icon={CalendarToday} iconSize="small" text={fechaEntrega} />
        )}

        {repartidor?.name && (
          <IconText icon={Person} iconSize="small" text={repartidor.name} />
        )}
      </div>
    </div>
  );
};
