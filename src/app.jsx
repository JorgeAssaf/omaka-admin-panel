import { useState } from 'preact/hooks'
import styled from 'styled-components';
import './app.css'
import AppRouter from './routes/routes'

export function App() {
  return (
    <AppRouter />
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
