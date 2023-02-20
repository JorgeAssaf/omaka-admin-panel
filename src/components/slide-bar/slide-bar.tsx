import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import GeneralItemDrawer from './item-drawer';
// import { pinIcon, settingsIcon, userIcon } from '../../helpers/icons.js';
import { TextSnippet, FmdGood, Person, Settings } from '@mui/icons-material';

const PEDIDOS = 'pedidos';
const CONFIGURACION = 'configuracion';
const RUTAS = 'rutas';
const CONDUCTORES = 'conductores'

type SlideBarInterface = {
  changeContent: any;
}

export const SlideBar = ({changeContent} : SlideBarInterface) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [stateStyle, setStateStyle] = useState(PEDIDOS);

  const onClickItem = (e) => {
    setStateStyle(e);
    changeContent(e);
  };
  if (isDrawerOpen) {
    return (
      <StyledDrawer left onMouseLeave={() => setIsDrawerOpen(false)}>
        <GeneralItemDrawer
          activeIteam={stateStyle === PEDIDOS}
          text="Pedidos"
          index={0}
          imgIcon={TextSnippet}
          onClick={() => onClickItem(PEDIDOS)}
        />
        <GeneralItemDrawer
          activeIteam={stateStyle === RUTAS}
          text="Rutas"
          index={1}
          imgIcon={FmdGood}
          onClick={() => onClickItem(RUTAS)}
        />
        <GeneralItemDrawer
          activeIteam={stateStyle === CONDUCTORES}
          text="Conductores"
          imgIcon={Person}
          index={2}
          onClick={() => onClickItem(CONDUCTORES)}
        />
        <ContentSettings>
        <GeneralItemDrawer
          activeIteam={stateStyle === CONFIGURACION}
          text="Configuracion"
          imgIcon={Settings}
          index={3}
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
        index={0}
      />
      <GeneralItemDrawer
        activeIteam={stateStyle === RUTAS}
        imgIcon={FmdGood}
        index={1}
      />
      <GeneralItemDrawer
        activeIteam={stateStyle === CONDUCTORES}
        imgIcon={Person}
        index={2}
      />
      <ContentSettings>
        <GeneralItemDrawer
          activeIteam={stateStyle === CONFIGURACION}
          imgIcon={Settings}
          index={3}
        />
      </ContentSettings>
    </StyledDrawer>
  );
};

export default SlideBar;


type StyledDrawerProps = {
  left?:boolean;
  children: any;
  contracted?: boolean;
}

type ContentSettingsProps = {
  children: any;
}

const StyledDrawer = styled.div<StyledDrawerProps>`
  ${(props) =>
    props.left &&
    css`
      background: #FBF7EF;
      display: flex;
      flex-direction: column;
      height: 100%;
      text-align: center;
      width: 240px;
      -webkit-transition: all .5s ease; -moz-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease;
    `}
  ${(props) =>
    props.contracted &&
    css`
      background: #FBF7EF;
      color: #3D3D3D;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 75px;
      -webkit-transition: all .5s ease; -moz-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease;
    `}
    &: hover {
    background: #FBF7EF;
    display: flex;
    flex-direction: column;
    height: 100%;
    -webkit-transition: all .5s ease; -moz-transition: all .5s ease; -o-transition: all .5s ease; transition: all .5s ease;
  }
`;

const ContentSettings = styled.div<ContentSettingsProps>`
margin-top: auto;
  margin-bottom: 1rem;
`;
