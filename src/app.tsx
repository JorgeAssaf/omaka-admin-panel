import { useState } from 'preact/hooks'
import{ UserBar }from './components/user-bar'
import styled from 'styled-components';
import './app.css'
import { CardInformacion } from './components/cards/informacion/component';
import{ SlideBar} from './components/slide-bar';
import { GeneralStructure } from './components/general/structure-page/structure-page'
import { flexbox } from '@mui/system';

export function App() {

  const data={
    idPedido: '14-1317321',
    status: 'Entregado',
    primerTexto: 'Calle Tabachín 45, Talaquepaque, Jal. 857263', 
    segundoTexto: 'Eugenia Castillo',
    tipo: 'ruta',
    progressRute: 20,
  }
  const data2={
    idPedido: '14-1317321',
    status: 'Entregado',
    primerTexto: 'Calle Tabachín 45, Talaquepaque, Jal. 857263', 
    segundoTexto: 'Ramira Romo',
    tipo: 'pedido',
    progressRute: 20,
  }
  
  const card = <CardInformacion data={data} />;
  const card2 = <CardInformacion data={data2} />;

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
    <UserBar />
    <Content>

     <SlideBar />
    <GeneralStructure contentLeft={card} contentRight={card2} isMobile={true} />
    </Content>
    </div>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
