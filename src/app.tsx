import { useState } from 'preact/hooks'
import{ UserBar }from './components/user-bar'
import styled from 'styled-components';
import './app.css'
import { CardInformacion } from './components/cards/infornacion/component'

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
      <div>
        Aqui
      </div>
    </Content>
  )
}

const Content = styled.div`
max-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
`;
