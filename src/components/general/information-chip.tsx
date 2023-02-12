import React from 'react';
import styled from 'styled-components';

type InformationChipInterface = {
    state?: string;
    distancia?: string;
}

const backgroundColor = {
    'Sin ruta': '#F4BE52',
    'En ruta': '#7979F6',
    'En curso': '#7979F6',
    Pendiente: '#292929',
    Entregado: '#40C980',
    Distancia: '#FBF7EF',

}

export const InformationChip = ({state='', distancia}: InformationChipInterface) => {
    const colorBackGround = (distancia ? 'Distancia' : state);
    return(
    <Content state={backgroundColor[colorBackGround?colorBackGround:'Sin ruta']}>
        {distancia ? distancia : state.toLocaleUpperCase()}
    </Content>
)}

type ContentProps = {
    state: string;
  };

const Content = styled.div<ContentProps>`
    color: ${({ state }) => state === '#FBF7EF' ? '#292929' : '#FBF7EF' };
    background-color: ${({ state }) => state};
    border-radius: 25px;
    font-size:10px;
    padding-left: 5px;
    padding-right: 5px;
    `;