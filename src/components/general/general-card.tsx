import { SvgIcon } from "@mui/material";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Place, Person, Receipt, CalendarToday } from "@mui/icons-material";
import { ProgressRute } from "../route/progress-rute-circle/progress-circle";
import { InformationChip } from "./information-chip";

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
      <ContentTittle>
        {idPedido}
        <InformationChip state={status} distancia={distancia} />
      </ContentTittle>
      <ContentText>
        <SvgIconStyled
          component={tipo === "pedido" ? Place : Receipt}
          fontSize="small"
        />
        {primerTexto}
      </ContentText>
      <ContentText>
        <SvgIconStyled
          component={tipo === "pedido" ? Person : CalendarToday}
          fontSize="small"
        />
        {segundoTexto}
      </ContentText>
      {tipo === "ruta" ? (
        <ProgressRute ruteStatus={status} progressRute={progressRute} />
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

type SvgIconStyledProps = {
  component: any;
};

const ContentCard = styled.div<ContentCardProps>`
  display: flex;
  flex-direction: column;
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
  margin:8px 0px
`;

const ContentTittle = styled.div`
  font-family: Nunito;
  font-weight: bold;
  font-size: 1rem;
  display:flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom:8px;
`;
const ContentText = styled.div`
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
