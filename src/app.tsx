import { useState } from 'preact/hooks'
import{ UserBar }from './components/user-bar'
import './app.css'
import { CardInformacion } from './components/cards/informacion/component'
import { GeneralStructure } from './components/general/structure-page/structure-page'

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
    <>
    <UserBar />
    <GeneralStructure contentLeft='izquierda' contentRight='derecha' isMobile={true} />
    </>
  )
}
