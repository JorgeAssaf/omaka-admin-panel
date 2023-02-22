import { useState } from 'preact/hooks'
import styled from 'styled-components';
import './app.css'
import { AdminRoutes } from './routes/routes.js'
import { BrowserRouter } from 'react-router-dom';
import MapView from './components/map/MapView';
//,{ubicacionPedido:{lat:24.141141,lng:-204.9012558}}

export function App() {
  const puntos = [{ ubicacionPedido: { lat: 23.881141, lng: -104.4925558 } }, { ubicacionPedido: { lat: 23.141141, lng: -104.1005558 } }, { ubicacionPedido: { lat: 23.741141, lng: -104.1012558 } },{ubicacionPedido:{lat:24.141141,lng:-204.9012558}}]

  return (
    <MapView points={puntos} />
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
