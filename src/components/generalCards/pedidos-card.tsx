import { SvgIcon } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Place, Person, KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from "@mui/icons-material";
import { ProgressRute } from "../atoms/progressCircle/progress-circle";
import { InformationChip } from "../atoms/information-chip";
import './styles.css'
import { stringCutting } from "../../utils/stringModifier";
import { OrderType } from "../../types/typeOrders";
import { cardPropsType } from "../../types/typesCards";
import Colors from "../../utils/colors";
import { getStatusOrder } from "../../utils/pedidos";
type CardProps = {
  data: OrderType;
  onClick?: (item:OrderType) => void;
  cardProps?: cardPropsType;
  variant? : string;
  activeItem?: string;
};

const CardPedidos = ({ data, onClick, cardProps, variant, activeItem }: CardProps) => {
  const {
    idPedido,
    direccionPedido,
    nombreCliente,
    status,
  } = data;

  const [isSelect, setIsSelect] = useState(false);
  const colorStatus = variant?.includes('positive')? Colors().chalchihuitl400 : Colors().xochipaltic400;
  const onClickItem = () => {
    if(onClick) onClick(data);
  };

  useEffect(() => {
    setIsSelect(activeItem === data.idPedido);
  }, [activeItem])

  const textChip = data.report?'Reportado':getStatusOrder(data.status);

  const colorChip =  data.report
    ? Colors().xochipaltic400 
    :data.status === 'finish'
    ? Colors().chalchihuitl400
    : data.status === 'inProgress'
    ? Colors().texotli300
    : Colors().tizatl600;

  return (
    <div className={variant?.includes('newRate')?'cardContainer row':'' }>
      {variant === 'newRate negative' &&
      <div onClick={()=>onClickItem()} className='btnCircle'>
         <SvgIconStyled
            component={KeyboardArrowLeftRounded}
            fontSize="large"
            iconColor={colorStatus}
          />
      </div>
    }
    <ContentCard onClick={()=>onClickItem()} fullWidth={cardProps?.fullWidth} isSelect={isSelect}>
      <div>
        <ContentTittle >
          {idPedido?idPedido.slice(-8):''}
          <div className='card_chip_container'>
            <InformationChip  text={textChip} color={colorChip}  />
          </div>
        </ContentTittle>
        <ContentText>
          <SvgIconStyled
            component={Place}
            fontSize="small"
          />
          {stringCutting(direccionPedido,30)}
        </ContentText>
        <ContentText>
          <SvgIconStyled
            component={Person}
            fontSize="small"
          />
          {stringCutting(nombreCliente,30)}
        </ContentText>
      </div>
    </ContentCard>
    {variant === 'newRate positive' &&
      <div onClick={()=>onClickItem()} className='btnCircle'>
         <SvgIconStyled
            component={KeyboardArrowRightRounded}
            fontSize="large"
            iconColor={colorStatus}
          />
      </div>
    }
    </div>

  );
};

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
  iconColor?: string;
};



const ContentCard = styled.div<ContentCardProps>`
  display:flex;
  flex-direction:row;
  background-color: #FBF7EF};
  color:  #3D3D3D};
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
      border: 2px solid #3d3d3d;
    `}
  padding: 16px;
  min-width:200px;
  margin:8px;
`;

const ContentTittle = styled.div<ContentTextProps>`
  font-family: Nunito;
  font-weight: bold;
  font-size: 1rem;
  display:flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom:8px;
`;
const ContentText = styled.div<ContentTextProps>`
  font-family: Nunito;
  font-weight: 500;
  font-size:0.8rem;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const SvgIconStyled = styled(SvgIcon)<SvgIconStyledProps>`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 5px;
  color: ${({ iconColor }) => (iconColor  ? iconColor : "#292929")};
  justify-content: center;
`;



export default CardPedidos;