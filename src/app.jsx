import { useState } from 'preact/hooks'
import styled from 'styled-components';
import './app.css'
import AppRouter from './routes/routes'
import { Provider } from 'react-redux';
import Store from './redux/store';

export function App() {
  return (
    <Provider store={Store}>
      <AppRouter />
    </Provider>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;
