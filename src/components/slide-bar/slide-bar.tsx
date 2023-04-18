import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import GeneralItemDrawer from './item-drawer';
import { TextSnippet, FmdGood, Person, Settings, Inventory2 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PEDIDOS = '/panel/pedidos';
const CONFIGURACION = '/perfil';
const RUTAS = '/panel/rutas';
const CONDUCTORES = '/panel/repartidores'
const REPORTES = '/panel/reportes'



export const SlideBar = ({currentSection}: {currentSection: string}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const onClickItem = (e) => {
    navigate(e)
  };
  if (isDrawerOpen) {
  
    return (
      <StyledDrawer left onMouseLeave={() => setIsDrawerOpen(false)}>
        <GeneralItemDrawer
          activeIteam={currentSection === PEDIDOS}
          text="Pedidos"
          index={0}
          imgIcon={TextSnippet}
          onClick={() => onClickItem(PEDIDOS)}
        />
        <GeneralItemDrawer
          activeIteam={currentSection === RUTAS}
          text="Rutas"
          index={1}
          imgIcon={FmdGood}
          onClick={() => onClickItem(RUTAS)}
        />
        <GeneralItemDrawer
          activeIteam={currentSection === CONDUCTORES}
          text="Repartidores"
          imgIcon={Person}
          index={2}
          onClick={() => onClickItem(CONDUCTORES)}
        />
        <GeneralItemDrawer
          activeIteam={currentSection === REPORTES}
          text="Reportes"
          imgIcon={Inventory2}
          onClick={() => onClickItem(REPORTES)}
        />
        <ContentSettings>
        <GeneralItemDrawer
          activeIteam={currentSection === CONFIGURACION}
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
    <>
    <StyledDrawer className='slide-bar-onboarding' contracted onMouseOver={() => setIsDrawerOpen(!isDrawerOpen)}>

      <GeneralItemDrawer
        activeIteam={currentSection === PEDIDOS}
        imgIcon={TextSnippet}
        index={0}
      />
      <GeneralItemDrawer
        activeIteam={currentSection === RUTAS}
        imgIcon={FmdGood}
        index={1}
      />
      <GeneralItemDrawer
        activeIteam={currentSection === CONDUCTORES}
        imgIcon={Person}
        index={2}
      />
       <GeneralItemDrawer
        activeIteam={currentSection === REPORTES}
        imgIcon={Inventory2}
        index={3}
      />
      <ContentSettings>
        <GeneralItemDrawer
          activeIteam={currentSection === CONFIGURACION}
          imgIcon={Settings}
          index={4}
        />
      </ContentSettings>
    </StyledDrawer>
      
    </>
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
