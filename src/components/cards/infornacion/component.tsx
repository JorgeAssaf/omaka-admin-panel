import { SvgIcon } from '@mui/material';
import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import {Place, Person, Receipt, CalendarToday } from '@mui/icons-material';
import { ProgressRute } from '../../route/progress-rute-circle/component';

type CardProps = {
  idPedido: string;
  status: string;
  primerTexto: string;
  segundoTexto: string;
  progressRute?: number;
  tipo: string;
}

export const CardInformacion = ({idPedido, status, primerTexto, segundoTexto, progressRute, tipo}:CardProps) =>{
  
  const [ isSelect, setIsSelect] = useState(true);

  const clickPrueba = () =>{
    setIsSelect(!isSelect);
  }

  return(
  <ContentCard onClick={clickPrueba} isSelect={isSelect === true}>
    <div>
    <ContentTittle>
      {idPedido}
    </ContentTittle>
    <ContentText>
      <SvgIconStyled component={tipo === 'pedido' ? Place : Receipt } fontSize='small'/>
      {primerTexto}
    </ContentText>
    <ContentText>
      <SvgIconStyled component={tipo === 'pedido' ? Person : CalendarToday} fontSize='small' />
      {segundoTexto}
    </ContentText>
    </div>
    {tipo === 'ruta' ? <ProgressRute ruteStatus={status} progressRute={progressRute} /> : <div/> }
  </ContentCard>


)};

const ContentCard = styled.div`
display: flex;
flex-direction: row;
  background-color: #FBF7EF;
  border-radius: 12px;
  margin-top: 20px;
  text-align: left;
  padding: 10%;
  padding-left: 5%;
  width: 90%;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  &:hover{
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
  }

  ${({isSelect}) => isSelect && css `
    border: 2px solid #3D3D3D;
  `}

`;

const ContentTittle = styled.div`
font-family: Nunito;
font-weight: bold;
font-size: 24px;
`;
const ContentText = styled.div`
font-family: Nunito;
font-weight: 500;
margin-top: 10px;
position: relative;
display: flex;
flex-direction: row;
`;

const SvgIconStyled = styled(SvgIcon)`
margin-top: auto;
margin-bottom: auto;
margin-right: 5px;
justify-content: center;
`;