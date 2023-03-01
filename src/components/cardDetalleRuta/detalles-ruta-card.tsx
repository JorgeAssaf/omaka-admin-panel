import { SvgIcon } from "@mui/material";
import { useState } from "react";
import styled, { css } from "styled-components";
import { Person, Receipt, CalendarToday, AirplaneTicket } from "@mui/icons-material";
import { RateTypeFormSimple } from "../../types/typeRate";
import { IconText } from "../atoms/iconText";
import "./styles.css";
import Colors from "../../utils/colors";
import Typography from "../atoms/typography";
import Avatar from "../atoms/avatar/avatarUser";

export const DetallesRutaCard = (props: RateTypeFormSimple) => {
  const { nombreRuta, fechaEntrega, Pedidos, repartidor } = props;

  const [isSelect, setIsSelect] = useState(true);
  const clickPrueba = () => {
    setIsSelect(!isSelect);
  };
console.log('====================================');
console.log(repartidor);
console.log('====================================');
  return (
    <div className="card-detalle-ruta-container">
      <div>
      <Typography variant="cardTitle" color={Colors().iztac} >{nombreRuta}</Typography>
        {Pedidos && (
          <IconText
            textColor={Colors().akostik200}
            icon={Receipt}
            iconSize="small"
            text={`${Pedidos?.length} Pedido(s)`}
          />
        )}

        {!!fechaEntrega && (
          <IconText textColor={Colors().akostik200} icon={CalendarToday} iconSize="small" text={fechaEntrega} />
        )}
      </div>
      {repartidor?.id &&
         <div className='repartidor_detalles_ruta'>
            <div className='repartidor_name_right'>
              <Typography variant="cardInfo" color={Colors().iztac} >Conductor asignado</Typography>
              <Typography variant="cardTitle" color={Colors().iztac} >{repartidor.name}</Typography>
            </div>
            <Avatar size='2rem' src={repartidor.foto} />
        </div> 
      }
    </div>
  );
};
