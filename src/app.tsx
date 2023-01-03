import { useState } from 'preact/hooks'
import{ UserBar }from './components/user-bar'
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
    <>

  <CardInformacion idPedido={data.idPedido} status={data.statusPedido} primerTexto={data.direccionPedido} segundoTexto={data.nombrePedidoCliente} progressRute={data.progressRute} tipo={data.tipo} />
    </>
  )
}
