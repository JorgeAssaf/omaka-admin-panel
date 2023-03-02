import styled from 'styled-components';
import './app.css'
//,{ubicacionPedido:{lat:24.141141,lng:-204.9012558}}


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
