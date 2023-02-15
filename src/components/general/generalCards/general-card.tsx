import { SvgIcon } from "@mui/material";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Place, Person, Receipt, CalendarToday } from "@mui/icons-material";
import { ProgressRute } from "../progressCircle/progress-circle";
import { InformationChip } from "../information-chip";
import './styles.css'
import { stringCutting } from "../../../utils/stringModifier";
type CardProps = {
  data: any;
};

export const CardInformacion = ({ data }: CardProps) => {
  const {
    idPedido,
    status,
    primerTexto,
    segundoTexto,
    progressRute,
    tipo,
    distancia
  } = data;

  const [isSelect, setIsSelect] = useState(true);

  const clickPrueba = () => {
    setIsSelect(!isSelect);
  };

  return (
    <ContentCard onClick={clickPrueba} isSelect={isSelect === true} tipo={tipo}>
      <div>
        <ContentTittle >
          {idPedido}
          <InformationChip style={{marginLeft:'6px'}} state={status} distancia={distancia} />
        </ContentTittle>
        <ContentText>
          <SvgIconStyled
            component={tipo === "pedido" ? Place : Receipt}
            fontSize="small"
          />
          {stringCutting(primerTexto,30)}
        </ContentText>
        <ContentText>
          <SvgIconStyled
            component={tipo === "pedido" ? Person : CalendarToday}
            fontSize="small"
          />
          {stringCutting(segundoTexto,30)}
        </ContentText>
      </div>
      {tipo === "ruta" ? (
        <div className='progressContainer'>
          <ProgressRute ruteStatus={status} progressRute={progressRute} />
        </div>
      ) : (
        <div />
      )}
    </ContentCard>
  );
};

type ContentCardProps = {
  children: any;
  isSelect: boolean;
  tipo: string;
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
  background-color: ${({ tipo }) => (tipo === "ruta" ? "#3D3D3D" : "#FBF7EF")};
  color: ${({ tipo }) => (tipo === "ruta" ? "#FBF7EF" : "#3D3D3D")};
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
  margin:8px;
`;

const ContentTittle = styled.div`
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
