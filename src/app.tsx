import { useState } from 'preact/hooks'
import{ UserBar }from './components/user-bar'
import styled from 'styled-components';
import './app.css'
import { CardInformacion } from './components/cards/infornacion/component';
import{ SlideBar} from './components/slide-bar';

export function App() {

  const data={
    idPedido: '14-1317321',
    statusPedido: 'Entregado',
    direccionPedido: 'Calle Tabachín 45, Talaquepaque, Jal. 857263', 
    nombrePedidoCliente: 'Eugenia Castillo',
    tipo: 'ruta',
    progressRute: 20,
  }

  return (
    <Content>
      <UserBar />
      <SlideBar />
    </Content>
  )
}

const Content = styled.div`

  display: flex;
  flex-direction: column;
`;
