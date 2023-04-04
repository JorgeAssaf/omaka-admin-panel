import { SvgIcon } from "@mui/material";
import { useState } from "react";
import styled, { css } from "styled-components";
import {  Receipt, CalendarToday, TimerOutlined } from "@mui/icons-material";
import { RateType, RateTypeFormSimple } from "../../types/typeRate";
import { IconText } from "../atoms/iconText";
import "./styles.css";
import Colors from "../../utils/colors";
import Typography from "../atoms/typography";
import Avatar from "../atoms/avatar/avatarUser";
import { getDateAndHour, getTimeDifference } from "../../utils/dateAndTime";

export const DetallesRutaCard = (props: RateTypeFormSimple & RateType) => {
  const { nombreRuta, fechaEntrega, Pedidos, repartidor,fechaCreacion, fechaInicio, fechaTermino } = props;

  const [isSelect, setIsSelect] = useState(true);
  const clickPrueba = () => {
    setIsSelect(!isSelect);
  };


  

  return (
    <div className="card-detalle-ruta-container">
      <div className="card-detalle-ruta-header">
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

        </div>
        {repartidor?.id &&
          <div className='repartidor_detalles_ruta'>
              <div className='repartidor_name_right'>
                <Typography variant="cardInfo" color={Colors().iztac} >Conductor asignado</Typography>
                <Typography variant="cardTitle" color={Colors().iztac} >{repartidor.name}</Typography>
              </div>
              <Avatar uuid={repartidor.id} fullName={repartidor.name} size='middle' src={repartidor.foto} />
          </div> 
        }
      </div>
     
      <div className="card-detalle-ruta-footer">
        {fechaCreacion ? (
          <IconText textColor={Colors().akostik200} icon={CalendarToday} iconSize="small" text={`Creada el: ${getDateAndHour(fechaCreacion)}`} />
        ) : null}
        {fechaEntrega ? (
          <IconText textColor={Colors().akostik200} icon={CalendarToday} iconSize="small" text={`Fecha entrega: ${fechaEntrega}`} />
        ) : null}
        {fechaInicio ? (
          <IconText textColor={Colors().akostik200} icon={CalendarToday} iconSize="small" text={`Iniciada el: ${getDateAndHour(fechaInicio)}`} />
        ) : null}
        {fechaTermino ?(
          <IconText textColor={Colors().akostik200} icon={TimerOutlined} iconSize="small" text={`Tiempo en ruta: ${getTimeDifference(fechaInicio,fechaTermino)}`} />
        ): null}
      </div>
    
    </div>
  );
};
