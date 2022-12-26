import { useState } from 'preact/hooks'
import{ UserBar }from './components/user-bar'
import styled from 'styled-components';

export function App() {

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
