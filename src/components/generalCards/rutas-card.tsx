import { SvgIcon } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Receipt, CalendarMonth, Lock } from "@mui/icons-material";
import { ProgressRute } from "../atoms/progressCircle/progress-circle";
import { InformationChip } from "../atoms/information-chip";
import "./styles.css";
import { RateType } from "../../types/typeRate";
import { cardPropsType } from "../../types/typesCards";
import Colors from "../../utils/colors";
import { getStatusOrder } from "../../utils/pedidos";

type CardProps = {
  data: RateType;
  activeItem?: string;
  onClick?: (item:RateType) => void;
  cardProps?: cardPropsType;
};


const CardRutas = ({ data, onClick, cardProps, activeItem }: CardProps) => {
  const { idRuta, Pedidos, fechaEntrega, status, nombreRuta } = data;

  const [isSelect, setIsSelect] = useState(false);
  const textChip = getStatusOrder(data.status);

  const colorChip = data.status === 'finish'
    ? Colors().chalchihuitl400
    : data.status === 'inProgress'
    ? Colors().texotli300
    : Colors().tizatl600;

  useEffect(() => {
    setIsSelect(activeItem === data.idRuta);
  }, [activeItem])
  
  const onClickItem = () => {
    if (onClick) onClick(data);
  };

  return (
    <ContentCard
      onClick={() => onClickItem()}
      fullWidth={cardProps?.fullWidth}
      isSelect={isSelect}
    >
      <div>
        <ContentTittle>
          {nombreRuta}
          <div className="card_chip_container">
            <InformationChip text={textChip} color={colorChip} />
          </div>
        </ContentTittle>
        <ContentText>
          <SvgIconStyled component={Receipt} fontSize="small" />
          {Pedidos?.length} Pedido(s)
        </ContentText>
        <ContentText>
          <SvgIconStyled component={CalendarMonth} fontSize="small" />
          {fechaEntrega}
        </ContentText>
        <ContentText>
          <SvgIconStyled component={Lock} fontSize="small" />
          {idRuta ? idRuta.slice(-8) : ""}
        </ContentText>
        
      </div>
      <div className="progressContainer">
        <ProgressRute ruteStatus={status} progressRute={0.3} />
      </div>
    </ContentCard>
  );
};

export default CardRutas;

type ContentCardProps = {
  children: any;
  isSelect: boolean;
  fullWidth?: boolean;
};

type ContentTextProps = {
  children: any;
};

type SvgIconStyledProps = {
  component: any;
};

const ContentCard = styled.div<ContentCardProps>`
  display: flex;
  flex-direction: row;
  background-color: "#3D3D3D";
  color: "#FBF7EF";
  border-radius: 12px;
  justify-content: space-between;
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
      border: 2px solid #3d3d3d;
    `}
  padding: 16px;
  margin: 8px;
`;

const ContentTittle = styled.div<ContentTextProps>`
  font-family: Nunito;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 8px;
`;
const ContentText = styled.div<ContentTextProps>`
  font-family: Nunito;
  font-weight: 500;
  font-size: 0.8rem;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const SvgIconStyled = styled(SvgIcon)<SvgIconStyledProps>`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  justify-content: center;
`;
