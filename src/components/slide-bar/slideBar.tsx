import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import GeneralItemDrawer from './item-drawer';
// import { pinIcon, settingsIcon, userIcon } from '../../helpers/icons.js';
import { TextSnippet, FmdGood, Person, Settings } from '@mui/icons-material';

const PEDIDOS = 'pedidos';
const CONFIGURACION = 'configuracion';
const RUTAS = 'rutas';
const CONDUCTORES = 'conductores'

const SlideBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [stateStyle, setStateStyle] = useState(PEDIDOS);

  const onClickItem = (e) => {
    setStateStyle(e);
   // changeContent(e);
  };
  if (isDrawerOpen) {
    return (
      <StyledDrawer left onMouseLeave={() => setIsDrawerOpen(false)}>
        <GeneralItemDrawer
          activeIteam={stateStyle === PEDIDOS}
          text="Pedidos"
          imgIcon={TextSnippet}
          onClick={() => onClickItem(PEDIDOS)}
        />
        <GeneralItemDrawer
          activeIteam={stateStyle === RUTAS}
          text="Rutas"
          imgIcon={FmdGood}
          onClick={() => onClickItem(RUTAS)}
        />
        <GeneralItemDrawer
          activeIteam={stateStyle === CONDUCTORES}
          text="Conductores"
          imgIcon={Person}
          onClick={() => onClickItem(CONDUCTORES)}
        />
        <ContentSettings>
        <GeneralItemDrawer
          activeIteam={stateStyle === CONFIGURACION}
          text="Configuracion"
          imgIcon={Settings}
          onClick={() => onClickItem(CONFIGURACION)}
        />
        </ContentSettings>
      </StyledDrawer>
    );
  }
  return (
    <StyledDrawer contracted onMouseOver={() => setIsDrawerOpen(!isDrawerOpen)}>

      <GeneralItemDrawer
        activeIteam={stateStyle === PEDIDOS}
        imgIcon={TextSnippet}
      />
      <GeneralItemDrawer
        activeIteam={stateStyle === RUTAS}
        imgIcon={FmdGood}
      />
      <GeneralItemDrawer
        activeIteam={stateStyle === CONDUCTORES}
        imgIcon={Person}
      />
      <ContentSettings>
      <GeneralItemDrawer
        activeIteam={stateStyle === CONFIGURACION}
        imgIcon={Settings}
      />
      </ContentSettings>
    </StyledDrawer>
  );
};

export default SlideBar;

const StyledDrawer = styled.div`
  ${(props) =>
    props.left &&
    css`
      background: #FBF7EF;
      display: flex;
      flex-direction: column;
      height: 100%;
      text-align: center;
      width: 240px;
      border-top-right-radius: 12px ;
    `}
  ${(props) =>
    props.contracted &&
    css`
      background: #FBF7EF;
      color: #3D3D3D;
      display: flex;
      flex-direction: column;
      height: 90vh;
      width: 75px;
      border-top-right-radius: 12px;
    `}
    &: hover {
    background: #FBF7EF;
    display: flex;
    flex-direction: column;
    height: 90vh;
    border-top-right-radius: 24px;
  }
`;

const ContentSettings = styled.div`
margin-top: auto;
  margin-bottom: 1rem;
`;
