import React, {useState} from 'react';
import styled from 'styled-components';
import SlideBar from '../../components/slide-bar/slide-bar';
import {UserBar} from '../../components/user-bar/user-bar';
import { PanelRutas } from './panel-rutas';
import { PanelPedidos } from './panel-pedidos';

export const PanelDeControl = () => {
    const Seccion = {
        rutas: <PanelRutas />,
        pedidos: <PanelPedidos />,
    };

    const [seccionActiva, setSeccionActiva] = useState('pedidos')

    const CambiarSeccion = (seccionSeleccionada) =>{
        console.log(seccionSeleccionada)
        setSeccionActiva(seccionSeleccionada);
    }
    
      

    return(
    <div style={{display:'flex', flexDirection:'column'}}>
    <UserBar />
    <Content>
     <SlideBar changeContent={CambiarSeccion}  />
        {Seccion[seccionActiva]}
    </Content>
    </div>
    );
}

const Content = styled.div`
display: flex;
  flex-direction: row;
`;