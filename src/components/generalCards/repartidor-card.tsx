import { SvgIcon } from "@mui/material";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Phone, Mail } from "@mui/icons-material";
import { InformationChip } from "../atoms/information-chip";
import "./styles.css";
import { stringCutting } from "../../utils/stringModifier";
import { cardPropsType } from "../../types/typesCards";
import Colors from "../../utils/colors";
import { RepartidorType } from "../../types/typeRepartidor";
import Avatar from "../atoms/avatar/avatarUser";
import { IconText } from "../atoms/iconText";
import Typography from "../atoms/typography";
import { statusRepartidor } from "../../utils/statusTraslate";

type CardPropsTypes = {
  data: RepartidorType;
  onClick?: (item: RepartidorType) => void;
  cardProps?: cardPropsType;
};

const CardRepartidor = ({ data, onClick, cardProps }: CardPropsTypes) => {
  const { DatosPersonales, Ubicacion } = data;
  const { nombre, apellido, correo, telefono, foto } = DatosPersonales;
  const [isSelect, setIsSelect] = useState(false);

  const statusColor ={
    free:Colors().chalchihuitl400,
    expirate: Colors().zacatazcalli300,
    inRate: Colors().texotli200,
    inactive: Colors().xochipaltic400,
  }

  const onClickItem = () => {
    setIsSelect(!isSelect);
    if (onClick) onClick(data);
  };

  return (
    <ContentCard
      onClick={() => onClickItem()}
      fullWidth={cardProps?.fullWidth}
      isSelect={isSelect}
    >
      <div className="avatar_card">
        <Avatar src={foto} />
      </div>
      <div>
        <div className='title_card_container'>
          <div className='title_card'>
            <Typography
            color={Colors().akostik200}
            variant="cardTitle"
          >{`${nombre} ${apellido}`}</Typography>
          </div>
          <InformationChip text={statusRepartidor(Ubicacion?.status)} color={Ubicacion?.status? statusColor[Ubicacion.status]: Colors().chalchihuitl400} />
        </div>
       
        <IconText
          icon={Mail}
          iconSize="small"
          text={correo}
          textColor={Colors().akostik200}
        />
        <IconText
          icon={Phone}
          iconSize="small"
          text={telefono}
          textColor={Colors().akostik200}
        />
      </div>
    </ContentCard>
  );
};

type ContentCardProps = {
  children: any;
  isSelect: boolean;
  fullWidth?: boolean;
};


const ContentCard = styled.div<ContentCardProps>`
  display:flex;
  flex-direction:row;
  background-color: #232323;
  border-radius: 12px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
  }
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  ${({ isSelect }) =>
    isSelect &&
    css`
      border: 2px solid #F4BE52;
    `}
  padding: 16px;
  min-width:200px;
  margin:8px;
`;

export default CardRepartidor;
