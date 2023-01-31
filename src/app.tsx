import { useState } from 'preact/hooks'
import{ UserBar }from './components/user-bar'
import styled from 'styled-components';
import './app.css'
<<<<<<< HEAD
import { CardInformacion } from './components/cards/informacion/component'
import { GeneralStructure } from './components/general/structure-page/structure-page'
=======
import { CardInformacion } from './components/cards/infornacion/component';
import{ SlideBar} from './components/slide-bar';
>>>>>>> 9b311c90fb27d087164e75cad0f923581faadd0c

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
<<<<<<< HEAD
    <>
    <UserBar />
    <GeneralStructure contentLeft='izquierda' contentRight='derecha' isMobile={true} />
    </>
=======
    <Content>
      <UserBar />
      <SlideBar />
    </Content>
>>>>>>> 9b311c90fb27d087164e75cad0f923581faadd0c
  )
}

const Content = styled.div`

  display: flex;
  flex-direction: column;
`;
