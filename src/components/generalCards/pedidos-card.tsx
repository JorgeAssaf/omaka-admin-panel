import { SvgIcon } from "@mui/material";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Place, Person, Receipt, CalendarToday } from "@mui/icons-material";
import { ProgressRute } from "../atoms/progressCircle/progress-circle";
import { InformationChip } from "../atoms/information-chip";
import './styles.css'
import { stringCutting } from "../../utils/stringModifier";
import { OrderType } from "../../types/typeOrders";
type CardProps = {
  data: OrderType;
};

const CardPedidos = ({ data }: CardProps) => {
  const {
    idPedido,
    direccionPedido,
    nombreCliente,
    status,
  } = data;

  const [isSelect, setIsSelect] = useState(true);
  console.log('====================================');
  console.log(idPedido);
  console.log('====================================');
  const clickPrueba = () => {
    setIsSelect(!isSelect);
  };

  return (
    <ContentCard onClick={()=>clickPrueba()} isSelect={isSelect === true}>
         <div>
        <ContentTittle >
          {idPedido.slice(-8)}
          <InformationChip style={{marginLeft:'6px'}} state={status}  />
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
  );
};

type ContentCardProps = {
  children: any;
  isSelect: boolean;
};


type ContentTextProps = {
  children: any;
};


type SvgIconStyledProps = {
  component: any;
};



const ContentCard = styled.div<ContentCardProps>`
  display:flex;
  flex-direction:row;
  background-color: "#FBF7EF"};
  color:  "#3D3D3D"};
  border-radius: 12px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
  }
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
  justify-content: center;
`;



export default CardPedidos;