import { useState } from 'preact/hooks'
import styled from 'styled-components';
import './app.css'
import {AdminRoutes} from './routes/routes.js'
import { BrowserRouter } from 'react-router-dom';


export function App() {


  return (
    <BrowserRouter>
    <AdminRoutes />
    </BrowserRouter>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
